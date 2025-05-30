from flask import Flask, request, jsonify, render_template
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel, AutoPeftModelForCausalLM
from flask_cors import CORS

# Setup
app = Flask(__name__)
CORS(app)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model_path = "./chat-model-final"

# base_model = AutoModelForCausalLM.from_pretrained(
#     model_path, 
#     # device_map="auto", 
#     trust_remote_code=True
#     # offload_folder="offload"
# )
# base_model.to("cpu")

# model = PeftModel.from_pretrained(
#     base_model, 
#     model_path, 
# )

model = AutoPeftModelForCausalLM.from_pretrained(
    model_path,
    device_map="cpu",  # hoặc .to("cpu")
    trust_remote_code=True
)
model.to("cpu")

tokenizer = AutoTokenizer.from_pretrained(
    model_path, 
    trust_remote_code=True
)

# model.to(device)
print(device)
print("Hosting...")

@app.route("/")
def home():
    return render_template("website.html")

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/account")
def account():
    return render_template("account.html")

@app.route("/setting")
def setting():
    return render_template("setting.html")

@app.route("/beds")
def beds():
    return render_template("beds.html")

@app.route("/chairs")
def chairs():
    return render_template("chairs.html")

@app.route("/sofas")
def sofas():
    return render_template("sofas.html")

@app.route("/tables")
def tables():
    return render_template("tables.html")

@app.route("/tv")
def tv():
    return render_template("tv.html")

@app.route("/wardrobes")
def wardrobes():
    return render_template("wardrobes.html")

@app.route("/cabinet")
def cabinet():
    return render_template("cabinet.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/forgot-password")
def forgotPassword():
    return render_template("forgot-password.html")
# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.json
#     print("Received JSON:", data)
#     user_input = data.get("question", "")
#     print("User input:", user_input)

#     prompt = f"<|user|>\n{user_input}\n<|assistant|>\n"
#     inputs = tokenizer(prompt, return_tensors="pt").to(device)

#     outputs = model.generate(
#         **inputs,
#         max_new_tokens=60,
#         do_sample=False,
#         eos_token_id=tokenizer.eos_token_id,
#         pad_token_id=tokenizer.pad_token_id
#     )

#     decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)

#     if "<|assistant|>\n" in decoded:
#         answer = decoded.split("<|assistant|>\n")[1].strip().split("\n")[0]
#     else:
#         answer = decoded.strip()

#     return jsonify({"answer": answer})

# if __name__ == "__main__":
#     app.run(debug=True)

# # Đặt chế độ eval
# model.eval()

# @app.route("/", methods=["GET", "POST"])
# def chat():
#     response = ""
#     if request.method == "POST":
#         user_input = request.form.get("message", "")
#         try:
#             # Định dạng prompt theo kiểu chat của Qwen
#             messages = [
#                 {"role": "user", "content": user_input}
#             ]

#             input_ids = tokenizer.apply_chat_template(messages, return_tensors="pt").to(model.device)
#             output_ids = model.generate(
#                 input_ids=input_ids,
#                 max_new_tokens=200,
#                 do_sample=True,
#                 temperature=0.7,
#                 top_p=0.95
#             )

#             response = tokenizer.decode(output_ids[0][input_ids.shape[1]:], skip_special_tokens=True)

#         except Exception as e:
#             response = f"Error: {str(e)}"

#     return render_template("chatbox.html", response=response)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5050, debug=True)

def format_chat(messages):
    prompt = ""
    for msg in messages:
        if msg["role"] == "user":
            prompt += f"<|user|>\n{msg['content']}\n"
        elif msg["role"] == "assistant":
            prompt += f"<|assistant|>\n{msg['content']}\n"
    return prompt

@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return render_template("chatbot.html")
    
    elif request.method == "POST":
        try:
            data = request.json
            # print("Received JSON:", data)
            user_input = data.get("question", "")
            # print("User input:", user_input)

            # Giả lập một đoạn hội thoại (nếu chưa lưu được history)
            messages = [
                {"role": "user", "content": user_input}
            ]

            prompt = format_chat(messages) + "<|assistant|>\n"

            inputs = tokenizer(prompt, return_tensors="pt").to(device)

            outputs = model.generate(
                **inputs,
                max_new_tokens=60,
                do_sample=False,
                eos_token_id=tokenizer.eos_token_id or tokenizer.convert_tokens_to_ids("<|endoftext|>"),
                pad_token_id=tokenizer.pad_token_id or tokenizer.eos_token_id
            )

            decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)

            if "<|assistant|>\n" in decoded:
                answer = decoded.split("<|assistant|>\n")[1].strip().split("\n")[0]
            else:
                answer = decoded.strip()

            return jsonify({"answer": answer})
        
        except Exception as e:
            print("Exception:", str(e))
            return jsonify({"answer": "Internal server error."}), 500
    
if __name__ == "__main__":
    app.run(debug=True)