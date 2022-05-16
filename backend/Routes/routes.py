from flask import render_template
from transformers import TrOCRProcessor, VisionEncoderDecoderModel, AutoModelForSeq2SeqLM, AutoTokenizer, AutoModel, VisionEncoderDecoderConfig
import os
from flask import Flask, flash, request, redirect, url_for, render_template, Blueprint
from werkzeug.utils import secure_filename
from PIL import Image
import torch
import logging
import numpy as np

# make sure you delete this later during production
logging.basicConfig(level=logging.DEBUG)

processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
# processor = AutoTokenizer.from_pretrained('naver-clova-ocr/bros-base-uncased')
# model = AutoModel.from_pretrained("microsoft/trocr-base-handwritten")

Routes = Blueprint('routes', __name__, static_folder='static', template_folder='templates')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_split_values(image, treshold=240):
    arr = np.mean(np.array(image), (2,1))
    linebreak_idx = []
    indexes = []
    check_margin_end=True
    for ix,sum in enumerate(arr):
        if sum<=treshold and check_margin_end==True:
            linebreak_idx.append(ix)
            check_margin_end=False
        if sum>=treshold and check_margin_end==False:
            linebreak_idx.append(ix)
            indexes.append(linebreak_idx)
            linebreak_idx = []
            check_margin_end=True
    
    return indexes

def OCR(filename):
    image = Image.open(os.path.join('static', filename)).convert('RGB')
    idxs = get_split_values(image)
    passage = []

    for idx in idxs:
        cropped_image = image.crop((0, idx[0] - 7, image.size[0], idx[1] + 7))
        pixel_values = processor(images=cropped_image, return_tensors="pt").pixel_values
        generated_ids = model.generate(pixel_values)
        passage.append(processor.batch_decode(generated_ids, skip_special_tokens=True)[0])  
    
    return " ".join(passage)

def generateQuestions(text):
    PATH = "../MLModel/results/main"
    tokenizer = AutoTokenizer.from_pretrained(PATH, local_files_only=True)
    modelQuestion = AutoModelForSeq2SeqLM.from_pretrained(PATH, local_files_only=True)
    input_ids = tokenizer(text, return_tensors="pt").input_ids
    outputs = modelQuestion.generate(input_ids)
    return str(tokenizer.decode(outputs[0], skip_special_tokens=True))

@Routes.route("/api/processText", methods=['POST'])
def process_text(): 
    text = request.form['InputText']
    questions = generateQuestions(text)
    return {"question": questions, "OCR_output": ""}

@Routes.route('/api/process')
def upload_form():
    return {"question" : "", "OCR_output" : ""}

@Routes.route('/api/process', methods=['POST'])
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
        print("Running OCR:")
        OCR_output = OCR(filename)
        print("Generating Questions:")
        questions = generateQuestions(OCR_output)
        return {"question" : questions, "OCR_output" : OCR_output}



    # pixel_values = processor(images=image, return_tensors='pt').pixel_values
    # horiz_hist = (torch.sum(torch.sum(pixel_values, 0), 0)/255).reshape(384)
    # linebreak_idx = [0]
    # check_margin_end = False
    # passage = []
    # for ix,sum in enumerate(horiz_hist):
    #     if sum <= 3.13 and check_margin_end == False:
    #         linebreak_idx.append(ix)
    #         check_margin_end =  True
    #     if sum >= 3.13 and check_margin_end == True:
    #         top_current = linebreak_idx.pop()
    #         lower = ((linebreak_idx[0])/384)*image.size[1]
    #         average = (((ix+top_current)/2)/384)*image.size[1]
    #         cropped_image = image.crop((0, lower, image.size[0], average))
    #         pixel_values = processor(images=cropped_image, return_tensors='pt').pixel_values
    #         generated_ids = model.generate(pixel_values)
    #         passage.append(processor.batch_decode(generated_ids, skip_special_tokens=True)[0])
    #         check_margin_end = False
