from PIL import Image
import numpy as np
import io


def preprocess_image(file_bytes):

    img = Image.open(
        io.BytesIO(file_bytes)
    )

    img = img.convert(
        "RGB"
    )

    img = img.resize(
        (224,224)
    )

    arr = np.array(
        img,
        dtype=np.float32
    )

    arr = np.expand_dims(
        arr,
        axis=0
    )
    print(
        arr.shape
    )

    print(
        arr.min(),
        arr.max(),
        arr.mean()
    )

    return arr