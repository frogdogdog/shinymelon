import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const { sub_skill_id } = await request.json();

    // 1. Fetch the sub-skill and its parent skill node
    const { data: subSkill, error: subSkillError } = await supabase
      .from('sub_skills')
      .select(`
        id,
        name,
        difficulty,
        skill_node_id,
        skill_nodes (
          id,
          code,
          name,
          cc_standard,
          clusters (
            name,
            domains (
              name,
              code,
              grade_id
            )
          )
        )
      `)
      .eq('id', sub_skill_id)
      .single();

    if (subSkillError) throw new Error(subSkillError.message);

    const node = subSkill.skill_nodes;
    const cluster = node.clusters;
    const domain = cluster.domains;
    const grade = domain.grade_id === 'K' ? 'Kindergarten' : `${domain.grade_id}st Grade`;
    const difficultyLabel = ['', 'Introduction', 'Practice', 'Challenge'][subSkill.difficulty];
    const skillUrl = `shinymelon.com/math/${domain.grade_id.toLowerCase()}/${domain.code.toLowerCase()}/${node.code.toLowerCase()}`;
    const copyrightYear = new Date().getFullYear();

    // 2. Build the prompt
    const prompt = `You are an expert elementary math curriculum designer creating a worksheet for ShinyMelon, an educational platform for young children.

WORKSHEET DETAILS:
- Grade: ${grade}
- Domain: ${domain.name}
- Cluster: ${cluster.name}
- Skill: ${node.name} [${node.cc_standard || 'Extension'}]
- Sub-skill / Variant: ${subSkill.name}
- Difficulty Level: ${subSkill.difficulty}/3 (${difficultyLabel})

DESIGN RULES:
- Language must be simple enough for ${grade} students
- Use fun, child-friendly themes (animals, food, toys, nature)
- Questions must directly practice the sub-skill — no tangents
- Difficulty ${subSkill.difficulty} means: ${subSkill.difficulty === 1 ? 'very simple, heavily scaffolded, 1-2 step' : subSkill.difficulty === 2 ? 'moderate, some scaffolding, 2-3 step' : 'challenging, minimal scaffolding, multi-step'}
- Include exactly 8 questions
- Every question must have one clear correct answer
- Answer key must be complete and accurate

Respond ONLY with a valid JSON object — no markdown, no backticks, no explanation. Use this exact structure:

{
  "title": "Worksheet title (fun, skill-specific, 4-8 words)",
  "instructions": "One sentence telling the child what to do",
  "theme": "The fun theme you chose (e.g. 'jungle animals', 'pizza', 'dinosaurs')",
  "questions": [
    {
      "number": 1,
      "prompt": "The question text",
      "type": "fill-in | multiple-choice | true-false | draw-and-count",
      "options": ["A", "B", "C"] // only include for multiple-choice
    }
  ],
  "answer_key": [
    {
      "number": 1,
      "answer": "The correct answer"
    }
  ]
}`;

    // 3. Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    // 4. Parse the response
    const rawText = message.content[0].text;
    const worksheetData = JSON.parse(rawText);

    // 5. Save to database
    const { data: worksheet, error: insertError } = await supabase
      .from('worksheets')
      .insert({
        sub_skill_id: subSkill.id,
        skill_node_id: node.id,
        variant_index: 1,
        title: worksheetData.title,
        instructions: worksheetData.instructions,
        questions: worksheetData.questions,
        answer_key: worksheetData.answer_key,
        logo_version: 'v1',
        copyright_year: copyrightYear,
        skill_url: skillUrl,
      })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);

    // 6. Return the worksheet
    return Response.json({
      success: true,
      worksheet: {
        ...worksheet,
        theme: worksheetData.theme,
        grade,
        skill: node.name,
        sub_skill: subSkill.name,
        cc_standard: node.cc_standard,
        skill_url: skillUrl,
        copyright_year: copyrightYear,
      }
    });

  } catch (error) {
    console.error('Worksheet generation error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}