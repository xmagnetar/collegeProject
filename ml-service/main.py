from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
from utils.preprocess import preprocess_image
import uvicorn

app = FastAPI()


# Load model once at startup
MODEL_PATH = "./model/dry_eye.keras"

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

# import numpy as np

# x1 = np.random.randint(
# 0,
# 256,
# (1,224,224,3)
# ).astype("float32")

# x2 = np.random.randint(
# 0,
# 256,
# (1,224,224,3)
# ).astype("float32")

# print(
# model.predict(
# x1,
# verbose=0
# )
# )

# print(
# model.predict(
# x2,
# verbose=0
# )
# )

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:

        # Read uploaded image
        file_bytes = await file.read()

        # Preprocess
        processed_image = preprocess_image(file_bytes)

        # Predict
        prediction = model.predict(
            processed_image,
            verbose=0
        )

        raw_score = float(prediction[0][0])
        
        print(file.filename)
        print(len(file_bytes))

        print('model.layer[0].get_config() : ')
        print(
        model.layers[0].get_config()
        )

        print("RAW SCORE:", raw_score)   

        # IMPORTANT:
        # score < 0.5 → Dry Eye
        # score >= 0.5 → Normal

        is_dry_eye = raw_score < 0.5

        if is_dry_eye:
            confidence = round(
                (1 - raw_score) * 100,
                2
            )
        else:
            confidence = round(
                raw_score * 100,
                2
            )

        return {
            "success": True,
            "prediction": (
                "Dry Eye"
                if is_dry_eye
                else "Normal"
            ),
            "confidence": f"{confidence}%"
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }


if __name__ == "__main__":

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )