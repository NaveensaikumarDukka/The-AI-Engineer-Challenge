from setuptools import setup, find_packages

setup(
    name="aimakerspace",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "openai",
        "numpy",
        "PyPDF2",
        "python-dotenv",
    ],
    python_requires=">=3.8",
) 