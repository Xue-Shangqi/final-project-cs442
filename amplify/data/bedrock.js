export function request(ctx) {
  const { ingredients = [] } = ctx.args;
  // Construct the prompt with the provided ingredients
  const prompt = `Suggest a recipe idea using these ingredients:
${ingredients.join(", ")}.`;
  // Return the request configuration
  return {
    resourcePath: `/model/meta.llama3-8b-instruct-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n${prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n`,
        max_gen_len: 1200,
        temperature: 0.7,
        top_p: 0.9
      }),
    },
  };
}
export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);
  const text =
    parsedBody?.content?.[0]?.text ??
    parsedBody?.completion ??
    parsedBody?.message ??
    JSON.stringify(parsedBody);
  return { body: text };
}
