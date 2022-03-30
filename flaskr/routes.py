from flask import render_template
import transformers
from transformers import TrOCRProcessor, VisionEncoderDecoderModel, AutoModel, AutoTokenizer
import os
from flask import Flask, flash, request, redirect, url_for, render_template, Blueprint
from werkzeug.utils import secure_filename
from matplotlib.pyplot import imread
from PIL import Image

# processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
# model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
processor = AutoTokenizer.from_pretrained('naver-clova-ocr/bros-base-uncased')
model = AutoModel.from_pretrained("microsoft/trocr-base-handwritten")

Routes = Blueprint('routes', __name__, static_folder='static', template_folder='templates')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def OCR(filename):
    image = Image.open(os.path.join('static', filename)).convert('RGB')
    pixel_values = processor(images=image, return_tensors='pt').pixel_values
    generated_ids = model.generate(pixel_values)
    return processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

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
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash("Image uploaded")
        return render_template('base.html', text=OCR(filename))

# @Routes.route('/display/<filename>')
# def display_image(filename):
#     return redirect(url_for('static', filename='uploads/'+filename), code=301)


