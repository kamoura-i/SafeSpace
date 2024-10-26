const inputFile = document.getElementById('arquivo');
const fileList = document.getElementById('fileList');

function updateFileList() {
  const files = inputFile.files;
  fileList.innerHTML = '';

  for (let i = 0; i < files.length; i++) {
    const fileItem = document.createElement('li');
    const fileName = document.createElement('span');
    fileName.textContent = files[i].name;
    
    const removeButton = document.createElement('span');
    removeButton.textContent = '×';
    removeButton.classList.add('remove-button');
    
    removeButton.onclick = function () {
      removeFile(i);
    };

    fileItem.appendChild(fileName);
    fileItem.appendChild(removeButton);
    fileList.appendChild(fileItem);
  }
}

function removeFile(index) {
  const files = inputFile.files;
  const dataTransfer = new DataTransfer();

  for (let i = 0; i < files.length; i++) {
    if (i !== index) {
      dataTransfer.items.add(files[i]);
    }
  }

  inputFile.files = dataTransfer.files;
  updateFileList();
}

inputFile.addEventListener('change', updateFileList);




document.getElementById("denunciaForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const tipoDenuncia = document.getElementById("tipodenuncia").value;
  const tipoProblema = document.getElementById("tipoproblema").value;
  const assunto = document.getElementById("assunto").value;
  const descricao = document.getElementById("descricao").value;

  if (!assunto.trim()) {
      alert("Por favor, preencha o campo Assunto.");
      return; 
  }

  if (!descricao.trim()) {
      alert("Por favor, preencha o campo Descrição.");
      return; 
  }


  const formData = new FormData();
  formData.append("tipoDenuncia", tipoDenuncia);
  formData.append("tipoProblema", tipoProblema);
  formData.append("assunto", assunto);
  formData.append("descricao", descricao);


  fetch("/submitDenuncia", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert("Denúncia enviada com sucesso!");
      } else {
          alert("Erro ao enviar denúncia.");
      }
  })
  .catch(error => {
      console.error("Erro:", error);
  });
});