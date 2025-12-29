from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json
import re
import os

app = Flask(__name__)
CORS(app)

# Hugging Face router client
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ.get("HF_API_KEY")
)

system_prompt = """You are an execution-focused AI coach.

Return only valid JSON in this exact format:
{
  "goal": "...",
  "tasks": [
    {"title": "...", "order": 1, "done": false}
  ]
}

Rules:
- Break the goal into concrete, executable steps
- Tasks must be ordered
- The final task must complete the goal
- No explanations
- No markdown
- No extra text
"""

def plan_goal(goal: str) -> dict:
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": goal}
    ]

    for _ in range(3):
        response = client.chat.completions.create(
            model="zai-org/GLM-4.7:novita",
            messages=messages,
            temperature=0.2,
            max_tokens=600
        )

        text = response.choices[0].message.content.strip()
        if not text:
            continue

        clean = re.sub(r"^```json\s*|```$", "", text, flags=re.MULTILINE)

        try:
            return json.loads(clean)
        except json.JSONDecodeError:
            messages.append({
                "role": "system",
                "content": "Output valid JSON only. No markdown."
            })

    raise ValueError("Failed to get valid JSON from model")

@app.route("/plan", methods=["POST"])
def plan_endpoint():
    data = request.json or {}
    goal = data.get("goal", "").strip()

    if not goal:
        return jsonify({"error": "No goal provided"}), 400

    try:
        plan = plan_goal(goal)
        return jsonify(plan)
    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Planning failed"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
