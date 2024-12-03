export const AI_SUMMARY_PROMPT = `作为一位思维教练，请对以下思考过程进行分析和总结。

思考内容：
{content}

请从以下几个方面进行分析：

1. 思考过程分析（占比 30%）：
- 思考的完整性和系统性
- 各个步骤之间的逻辑连贯性
- 是否充分利用了思维框架的每个环节

2. 思维方法评估（占比 30%）：
- 多角度思考的深度
- 问题分析的全面性
- 解决方案的可行性
- 思维过程中的创新点

3. 改进建议（占比 40%）：
- 思考过程中的不足之处
- 具体的改进方向和建议
- 可以进一步深入思考的方面
- 如何在未来类似情况中更好地运用思维框架

请用清晰、专业且富有洞察力的语言进行总结，帮助用户提升思维能力。回答要具体且有针对性，避免泛泛而谈。`;

export const formatSummaryContent = (
  situation: string,
  answers: Record<string, string>,
  sections: Array<{ title: string; steps: string[] }>
) => {
  return `初始情况：
${situation}

思考过程：
${sections
    .map(
      (section, index) => `${section.title}：
${answers[index + 1] || '未填写'}`
    )
    .join('\n\n')}`;
};
