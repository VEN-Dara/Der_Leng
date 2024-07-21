import spacy

def install_model():
    spacy.cli.download("en_core_web_md")

if __name__ == "__main__":
    install_model()
