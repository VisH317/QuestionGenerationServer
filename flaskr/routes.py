from flask import render_template
import transformers
from transformers import TrOCRProcessor, VisionEncoderDecoderModel, AutoModelForSeq2SeqLM, AutoTokenizer, AutoModel, VisionEncoderDecoderConfig
import os
from flask import Flask, flash, request, redirect, url_for, render_template, Blueprint
from werkzeug.utils import secure_filename
from matplotlib.pyplot import imread
from PIL import Image

processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
# processor = AutoTokenizer.from_pretrained('naver-clova-ocr/bros-base-uncased')
# model = AutoModel.from_pretrained("microsoft/trocr-base-handwritten")

Routes = Blueprint('routes', __name__, static_folder='static', template_folder='templates')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def OCR(filename):
    image = Image.open(os.path.join('static', filename)).convert('RGB')
    pixel_values = processor(images=image, return_tensors='pt').pixel_values
    generated_ids = model.generate(pixel_values)
    return processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

def generateQuestions(text):
    PATH = "./results/checkpoint-17500"
    tokenizer = AutoTokenizer.from_pretrained(PATH, local_files_only=True)
    modelQuestion = AutoModelForSeq2SeqLM.from_pretrained(PATH, local_files_only=True)
    input_ids = tokenizer(text, return_tensors="pt").input_ids
    outputs = modelQuestion.generate(input_ids)
    return str(tokenizer.decode(outputs[0], skip_special_tokens=True))

@Routes.route('/')
def upload_form():
    return render_template('base.html')

@Routes.route('/', methods=['POST'])
def upload_image():
    from app import app
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash("No image selected for uploading")
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        #return render_template('base.html', text=type(filename), text_ocr="OCR_output")
        file.save("./" + os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash("Image uploaded")
        OCR_output = OCR(filename)
        questions = generateQuestions(OCR_output)
        return render_template('base.html', text=questions, text_ocr=OCR_output)

# @Routes.route('/display/<filename>')
# def display_image(filename):
#     return redirect(url_for('static', filename='uploads/'+filename), code=301)


