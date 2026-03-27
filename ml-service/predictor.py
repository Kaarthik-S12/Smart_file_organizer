def classify_files(files):

    categories = {
        "images": 0,
        "documents": 0,
        "videos": 0,
        "archives": 0,
        "others": 0
    }

    image_ext = ["jpg","png","jpeg","gif"]
    doc_ext = ["pdf","docx","txt"]
    video_ext = ["mp4","mkv","avi"]
    archive_ext = ["zip","rar"]

    for file in files:

        ext = file["type"].lower()

        if ext in image_ext:
            categories["images"] += 1

        elif ext in doc_ext:
            categories["documents"] += 1

        elif ext in video_ext:
            categories["videos"] += 1

        elif ext in archive_ext:
            categories["archives"] += 1

        else:
            categories["others"] += 1

    return categories