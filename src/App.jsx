import "./styles/global.css";
import "./styles/styles.css";
import CloudUpload from "./img/cloudUpload.png";
import { useState } from "react";
import jsPDF from "jspdf";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Arquivo ainda não foi selecionado");

  const pdfGenerate = () => {
    if (!image) {
      alert("Por favor, anexe uma imagem antes de gerar o PDF");
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const base64image = event.target.result;

      const doc = new jsPDF("p", "pt", "a4");
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();

      doc.addImage(base64image, "JPEG", 0, 0, width, height);
      doc.save(`${fileName.split(".")[0]}.pdf`);
    };
    reader.readAsDataURL(image);
  };

  return (
    <main className="container">
      <h1>Anexe a imagem que você deseja transformar em PDF pelo upload</h1>
      <form
        action=""
        onClick={() => document.querySelector(".input-container").click()}
      >
        <input
          type="file"
          className="input-container"
          hidden
          accept="images/"
          onChange={({ target: { files } }) => {
            if (files[0]) {
              setFileName(files[0].name);
              setImage(files[0]);
            }
          }}
        />

        {image ? (
          <img src={URL.createObjectURL(image)} alt={fileName} />
        ) : (
          <img src={CloudUpload} alt="Nuvem de carregamento" />
        )}
        <h4>Anexe a sua imagem aqui</h4>
      </form>
      <button onClick={pdfGenerate} type="button">
        Transformar em PDF
      </button>
    </main>
  );
}
