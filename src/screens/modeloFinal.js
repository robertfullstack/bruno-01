// faça a mesma coisa para o áudio 01:
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import Cronometro from "../funcionalidades/cronometro/cronometro"; // Importe o componente Cronometro
import Metronomo from "../funcionalidades/metronomo/metronomo"; // Importe o componente Metronomo
import FlashCard from "../funcionalidades/flashCard/flashCard"; // Importe o componente FlashCard
import ReactDOM from "react-dom";
import "./sa.css"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IconTexto from "../icons/icon-texto.png";
import IconImage from "../icons/icon-image.png";
import IconVideo from "../icons/icon-video.png";
import IconCronometro from "../icons/icon-cronometro.png";
import IconMetronomo from "../icons/icon-metronomo.png";
import IconFlashCard from "../icons/icon-flash-card.png";
import IconDeitarTela from "../icons/icon-deitar-tela.png";
import IconDiminuir from "../icons/icon-diminuir.png";
import iconVideoDois from "../icons/icon-video.png";

export default function ModeloFinal() {
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [imagem1, setImagem1] = useState(null);
    const [tempoImagem1, setTempoImagem1] = useState(0);
    const [imagem2, setImagem2] = useState(null);
    const [tempoImagem2, setTempoImagem2] = useState(0);

    const [imagem3, setImagem3] = useState(null);
    const [tempoTexto3, setTempoTexto3] = useState(0);
    const [imagem4, setImagem4] = useState(null);
    const [tempoTexto4, setTempoTexto4] = useState(0);
    const [tempoTexto5, setTempoTexto5] = useState(0);
    const [tempoTexto6, setTempoTexto6] = useState(0);

    const [tituloAula, setTituloAula] = useState("");
    const [descricaoAula, setDescricaoAula] = useState("");

    const [texto1, setTexto1] = useState("");
    const [tempoTexto1, setTempoTexto1] = useState(0);

    const [texto2, setTexto2] = useState("");
    const [tempoTexto2, setTempoTexto2] = useState(0);

    const [texto3, setTexto3] = useState("");
    const [tempoImagem3, setTempoImagem3] = useState(0);

    const [texto4, setTexto4] = useState("");
    const [texto5, setTexto5] = useState("");
    const [texto6, setTexto6] = useState("");
    const [tempoImagem4, setTempoImagem4] = useState(0);

    const [videoUrl, setVideoUrl] = useState("");
    const [tempoVideo, setTempoVideo] = useState(0);

    const [tempoCronometro1, setTempoCronometro1] = useState(0);
    const [tempoCronometro2, setTempoCronometro2] = useState(0);
    const [tempoCronometro3, setTempoCronometro3] = useState(0);
    const [tempoCronometro4, setTempoCronometro4] = useState(0);

    const [tempoMetronomo1, setTempoMetronomo1] = useState(0);
    const [tempoMetronomo2, setTempoMetronomo2] = useState(0);
    const [tempoMetronomo3, setTempoMetronomo3] = useState(0);

    const [tempoFlashCard1, setTempoFlashCard1] = useState(0);
    const [tempoFlashCard2, setTempoFlashCard2] = useState(0);
    const [tempoFlashCard3, setTempoFlashCard3] = useState(0);
    const [tempoFlashCard4, setTempoFlashCard4] = useState(0);

    const [containerNone, setContainerNone] = useState(false);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const snapshot = await db.collection("seuColecao").where("classID", "==", id).get();
                const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setItems(fetchedItems);
            } catch (error) {
                console.error("Erro ao buscar itens: ", error);
            }
        };

        if (id) {
            fetchItems(); // Chama a função para buscar as aulas da turma com base no ID da URL
        }
    }, [id]);

    const handlePresent = (itemId) => {
        const item = items.find(item => item.id === itemId);
        if (item) {
            apresentarItem(item);
            setContainerNone(!containerNone);

        }

    };

    const apresentarItem = async (item) => {
        const apresentacaoDiv = document.getElementById("apresentacao-aula");
        apresentacaoDiv.innerHTML = ""; // Limpar o conteúdo anterior

        const apresentarConteudo = async (conteudo, tempo) => {
            apresentacaoDiv.textContent = conteudo;
            await new Promise(resolve => setTimeout(resolve, tempo * 1000)); // Aguardar pelo tempo especificado
            apresentacaoDiv.textContent = ""; // Limpar o conteúdo após o tempo
        };

        await apresentarConteudo(item.texto1, item.tempoTexto1);
        if (item.imagem1Url) {
            const imagem1Tag = document.createElement("img");
            imagem1Tag.src = item.imagem1Url;
            apresentacaoDiv.appendChild(imagem1Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem1 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem1Tag); // Remover a imagem após o tempo
        }

        // Apresentar vídeo YT 01
        // Apresentar vídeo YT 01
        if (item.videoUrl) {
            const videoDiv = document.createElement("div");
            const video = document.createElement("iframe");
            video.width = "560";
            video.height = "315";
            // video.style.marginTop = "-200px";
            video.src = item.videoUrl;
            videoDiv.appendChild(video);
            apresentacaoDiv.appendChild(videoDiv);
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT
            apresentacaoDiv.removeChild(videoDiv); // Remover o vídeo após o tempo
        }


        if (item.tempoCronometro1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro1 = document.getElementById("apresentacao-cronometro-1");
            apresentacaoCronometro1.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer1 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro1.appendChild(cronometroContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer1); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro1.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro1 * 1000));

            apresentacaoCronometro1.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }


        // Apresentar metrônomo 01
        if (item.tempoMetronomo1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoMetronomo1 = document.getElementById("apresentacao-metronomo-1");
            apresentacaoMetronomo1.innerHTML = ""; // Remover o componente Metrônomo 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Metrônomo 1 seja desmontado e removido completamente

            const metronomoContainer1 = document.createElement("div"); // Criar um novo elemento para o componente Metrônomo 1
            apresentacaoMetronomo1.appendChild(metronomoContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<Metronomo />, metronomoContainer1); // Renderizar o componente Metrônomo 1 no novo elemento

            apresentacaoMetronomo1.style.display = "block"; // Exibir o componente Metrônomo 1
            // apresentacaoMetronomo1.style.marginTop = "-300px"; // Definir marginTop

            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000));

            apresentacaoMetronomo1.style.display = "none"; // Ocultar o componente Metrônomo 1 após o tempo definido
        }

        // Apresentar FlashCard 01
        if (item.tempoFlashCard1) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard1 = document.getElementById("apresentacao-flashcard-1");
            apresentacaoFlashCard1.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer1 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard1.appendChild(flashCardContainer1); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCard />, flashCardContainer1); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard1.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard1 * 1000));

            apresentacaoFlashCard1.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        await apresentarConteudo(item.texto2, item.tempoTexto2);
        if (item.imagem2Url) {
            const imagem2Tag = document.createElement("img");
            imagem2Tag.src = item.imagem2Url;
            apresentacaoDiv.appendChild(imagem2Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem2 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem2Tag); // Remover a imagem após o tempo
        }
        await apresentarConteudo(item.texto3, item.tempoTexto3);
        if (item.imagem3Url) {
            const imagem3Tag = document.createElement("img");
            imagem3Tag.src = item.imagem3Url;
            apresentacaoDiv.appendChild(imagem3Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem3 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem3Tag); // Remover a imagem após o tempo
        }
        await apresentarConteudo(item.texto4, item.tempoTexto4);
        if (item.imagem4Url) {
            const imagem4Tag = document.createElement("img");
            imagem4Tag.src = item.imagem4Url;
            apresentacaoDiv.appendChild(imagem4Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem4 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem4Tag); // Remover a imagem após o tempo
        }
        await apresentarConteudo(item.texto5, item.tempoTexto5);
        if (item.imagem5Url) {
            const imagem5Tag = document.createElement("img");
            imagem5Tag.src = item.imagem5Url;
            apresentacaoDiv.appendChild(imagem5Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem5 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem5Tag); // Remover a imagem após o tempo
        }
        await apresentarConteudo(item.texto6, item.tempoTexto6);
        if (item.imagem6Url) {
            const imagem6Tag = document.createElement("img");
            imagem6Tag.src = item.imagem6Url;
            apresentacaoDiv.appendChild(imagem6Tag);
            await new Promise(resolve => setTimeout(resolve, item.tempoImagem6 * 1000)); // Aguardar pelo tempo da imagem
            apresentacaoDiv.removeChild(imagem6Tag); // Remover a imagem após o tempo
        }

        if (item.tempoCronometro2) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro2 = document.getElementById("apresentacao-cronometro-2");
            apresentacaoCronometro2.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer2 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro2.appendChild(cronometroContainer2); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer2); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro2.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro2 * 1000));

            apresentacaoCronometro2.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }
        if (item.tempoCronometro3) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro3 = document.getElementById("apresentacao-cronometro-3");
            apresentacaoCronometro3.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer3 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro3.appendChild(cronometroContainer3); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer3); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro3.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro3 * 1000));

            apresentacaoCronometro3.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }
        if (item.tempoCronometro4) {
            await new Promise(resolve => setTimeout(resolve, item.tempoVideo * 1000)); // Aguardar pelo tempo do vídeo YT

            const apresentacaoCronometro4 = document.getElementById("apresentacao-cronometro-4");
            apresentacaoCronometro4.innerHTML = ""; // Remover o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente Cronômetro 1 seja desmontado e removido completamente

            const cronometroContainer4 = document.createElement("div"); // Criar um novo elemento para o componente Cronômetro 1
            apresentacaoCronometro4.appendChild(cronometroContainer4); // Adicionar o elemento ao DOM

            ReactDOM.render(<Cronometro />, cronometroContainer4); // Renderizar o componente Cronômetro 1 no novo elemento

            apresentacaoCronometro4.style.display = "block"; // Exibir o componente Cronômetro 1

            await new Promise(resolve => setTimeout(resolve, item.tempoCronometro4 * 1000));

            apresentacaoCronometro4.style.display = "none"; // Ocultar o componente Cronômetro 1 após o tempo definido
        }

        if (item.tempoFlashCard2) {
            await new Promise(resolve => setTimeout(resolve, item.tempoMetronomo1 * 1000)); // Aguardar pelo tempo do metrônomo 01

            const apresentacaoFlashCard2 = document.getElementById("apresentacao-flashcard-2");
            apresentacaoFlashCard2.innerHTML = ""; // Remover o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, 100)); // Tempo para garantir que o componente FlashCard 1 seja desmontado e removido completamente

            const flashCardContainer2 = document.createElement("div"); // Criar um novo elemento para o componente FlashCard 1
            apresentacaoFlashCard2.appendChild(flashCardContainer2); // Adicionar o elemento ao DOM

            ReactDOM.render(<FlashCard />, flashCardContainer2); // Renderizar o componente FlashCard 1 no novo elemento

            apresentacaoFlashCard2.style.display = "block"; // Exibir o componente FlashCard 1

            await new Promise(resolve => setTimeout(resolve, item.tempoFlashCard2 * 1000));

            apresentacaoFlashCard2.style.display = "none"; // Ocultar o componente FlashCard 1 após o tempo definido
        }

        // Mesmo processo para os cronômetros 2 e 3
        // Mesmo processo para os metrônomos 2 e 3
        // Mesmo processo para os FlashCards 2 e 3
    };
    const [videoFile, setVideoFile] = useState(null);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const classID = id;
            const docRef = await db.collection("seuColecao").add({
                classID,
                tituloAula,
                descricaoAula,
                texto1,
                imagem1Url: "",
                tempoTexto1: tempoTexto1 / 1000, // Convertendo segundos para milissegundos
                tempoImagem1: tempoImagem1 / 1000, // Convertendo segundos para milissegundos
                texto2,
                imagem2Url: "",
                tempoTexto2: tempoTexto2 / 1000, // Convertendo segundos para milissegundos
                tempoImagem2: tempoImagem2 / 1000, // Convertendo segundos para milissegundos
                texto3,
                texto4,
                texto5,
                texto6,
                imagem3Url: "",
                tempoTexto3: tempoTexto3 / 1000, // Convertendo segundos para milissegundos
                tempoTexto4: tempoTexto4 / 1000, // Convertendo segundos para milissegundos
                tempoTexto5: tempoTexto5 / 1000, // Convertendo segundos para milissegundos
                tempoTexto6: tempoTexto6 / 1000, // Convertendo segundos para milissegundos
                tempoImagem3: tempoImagem3 / 1000, // Convertendo segundos para milissegundos
                tempoImagem4: tempoImagem4 / 1000, // Convertendo segundos para milissegundos
                videoUrl, // Inicialmente vazio, pois o vídeo ainda não foi carregado
                tempoVideo: tempoVideo / 1000, // Convertendo segundos para milissegundos
                tempoCronometro1: tempoCronometro1 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro2: tempoCronometro2 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro3: tempoCronometro3 / 1000, // Convertendo segundos para milissegundos
                tempoCronometro4: tempoCronometro4 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo1: tempoMetronomo1 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo2: tempoMetronomo2 / 1000, // Convertendo segundos para milissegundos
                tempoMetronomo3: tempoMetronomo3 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard1: tempoFlashCard1 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard2: tempoFlashCard2 / 1000, // Convertendo segundos para milissegundos
                tempoFlashCard3: tempoFlashCard3 / 1000,
                tempoFlashCard4: tempoFlashCard4 / 1000,
            });

            const uploadImage = async (image, tempo, docRef, num) => {
                if (image) {
                    const storageRef = storage.ref();
                    const imagemRef = storageRef.child(`imagens/${docRef.id}/imagem${num}`);
                    await imagemRef.put(image);
                    const url = await imagemRef.getDownloadURL();
                    await docRef.update({
                        [`imagem${num}Url`]: url
                    });
                }
            };

            // Upload das imagens
            await uploadImage(imagem1, tempoImagem1, docRef, 1);
            await uploadImage(imagem2, tempoImagem2, docRef, 2);
            await uploadImage(imagem3, tempoImagem3, docRef, 3);
            await uploadImage(imagem4, tempoImagem4, docRef, 4);

            // Função de upload de vídeos
            const uploadVideo = async (videoFile, docRef) => {
                if (videoFile) {
                    const storageRef = storage.ref();
                    const videoRef = storageRef.child(`videos/${docRef.id}/video.mp4`);
                    await videoRef.put(videoFile);
                    const url = await videoRef.getDownloadURL();
                    await docRef.update({
                        videoUrl: url
                    });
                }
            };

            // Upload do vídeo
            await uploadVideo(videoFile, docRef);

            // Restante do código para upload de imagens e reset de estados
            // ...

            // Função de upload de imagens


            // Reset dos estados após envio
            setTituloAula("");
            setDescricaoAula("");
            setTexto1("");
            setImagem1(null);
            setTempoTexto1(0);
            setTempoImagem1(0);

            setTexto2("");
            setImagem2(null);
            setTempoTexto2(0);
            setTempoImagem2(0);

            setTexto3("");
            setImagem3(null);
            setTempoTexto3(0);
            setTempoImagem3(0);
            setTempoImagem4(0);

            setVideoUrl("");
            setTempoVideo(0);

            setTempoCronometro1(0);
            setTempoCronometro2(0);
            setTempoCronometro3(0);
            setTempoCronometro4(0);

            setTempoMetronomo1(0);
            setTempoMetronomo2(0);
            setTempoMetronomo3(0);

            setTempoFlashCard1(0);
            setTempoFlashCard2(0);
            setTempoFlashCard3(0);
            setTempoFlashCard4(0);

            toast.success("Aula criada com sucesso!");;
        } catch (error) {
            console.error("Erro ao enviar para o Firestore: ", error);
            toast.error("Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.");
        }
    };

    const [clickText, setClickText] = useState(0);
    const functionClickText = () => {
        setClickText(prevClickText => prevClickText + 1);

        const containers = document.querySelectorAll(".containerTexto");
        if (clickText < containers.length) {
            containers[clickText].style.display = "block";
        }

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickImage, setClickImage] = useState(0);
    const functionClickImage = () => {
        setClickImage(prevClickImage => prevClickImage + 1);

        const containers = document.querySelectorAll(".containerImagemItem");
        if (clickImage < containers.length) {
            containers[clickImage].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }


    const [clickVideo, setClickVideo] = useState(0);
    const functionClickVideo = () => {
        setClickVideo(prevClickVideo => prevClickVideo + 1);

        const containers = document.querySelectorAll(".containerVideo");
        if (clickVideo < containers.length) {
            containers[clickVideo].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickCronometro, setClickCronometro] = useState(0);
    const functionClickCronometro = () => {
        setClickCronometro(prevClickCronometro => prevClickCronometro + 1);

        const containers = document.querySelectorAll(".containerCronometro");
        if (clickCronometro < containers.length) {
            containers[clickCronometro].style.display = "block";
        }

        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickMetronomo, setClickMetronomo] = useState(0);
    const functionClickMetronomo = () => {
        setClickMetronomo(prevClickMetronomo => prevClickMetronomo + 1);

        const containers = document.querySelectorAll(".containerMetronomo");
        if (clickMetronomo < containers.length) {
            containers[clickMetronomo].style.display = "block";
        }

        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }
    const [clickFlashCard, setClickFlashCard] = useState(0);
    const functionClickFlashCard = () => {
        setClickFlashCard(prevClickFlashCard => prevClickFlashCard + 1);

        const containers = document.querySelectorAll(".containerFlashCard");
        if (clickFlashCard < containers.length) {
            containers[clickFlashCard].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }

    const [clickVideoLocal, setClickVideoLocal] = useState(0);
    const functionClickVideoLocal = () => {
        setClickFlashCard(prevClickFlashCard => prevClickFlashCard + 1);

        const containers = document.querySelectorAll(".containerFlashCard");
        if (clickFlashCard < containers.length) {
            containers[clickFlashCard].style.display = "block";
        }
        setClickText(clickText + 1)
        setClickImage(clickImage + 1)
        setClickVideo(clickVideo + 1)
        setClickCronometro(clickCronometro + 1)
        setClickFlashCard(clickFlashCard + 1)

        document.getElementById("detalhe-aula").style.display = "block";
    }


    const generateRandomId = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomId = "";
        for (let i = 0; i < 10; i++) {
            randomId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomId;
    };

    const isIdUnique = (newId, items) => {
        return items.every(item => item.id !== newId);
    };

    const handleChangeId = async (itemId, newId) => {
        try {
            // Verifica se o novo ID é único
            if (!isIdUnique(newId, items)) {
                alert("O novo ID não é único. Por favor, tente novamente.");
                return;
            }

            // Atualizar o ID no Firestore
            await db.collection("seuColecao").doc(itemId).update({ id: newId });

            // Atualizar localmente
            const updatedItems = items.map(item => {
                if (item.id === itemId) {
                    return { ...item, id: newId };
                } else {
                    return item;
                }
            });
            setItems(updatedItems);
            toast.success("ID atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar ID: ", error);
            toast.success(`Ocorreu um erro ao atualizar o ID: ${error.message}`);
        }
    };


    const [setVirarAula, virarAula] = useState(false)

    const [rotacao, setRotacao] = useState(0); // Estado para controlar a rotação

    const toggleRotacao = () => {
        setRotacao(rotacao === 0 ? 90 : 0); // Alterna entre 0 e 90 graus
        // COMPONENTES SEJAM MENOR
        var cronometro1 = document.getElementById("apresentacao-cronometro-1");
        if (cronometro1.style.height === "100%") {
            cronometro1.style.height = '50%';
        } else {
            cronometro1.style.height = '100%';
        }

        var flashacard1 = document.getElementById("apresentacao-flashcard-1");
        if (flashacard1.style.height === "100%") {
            flashacard1.style.height = '50%';
            flashacard1.style.marginTop = '170px';
            flashacard1.style.marginRight = '20px';
        } else {
            flashacard1.style.height = '100%';
        }

        var metronomo = document.getElementById("apresentacao-metronomo-1");
        if (metronomo.style.height === "100%") {
            metronomo.style.height = '50%';
        } else {
            metronomo.style.height = '100%';
        }





        // document.getElementById("apresentacao-cronometro-2").style.width = '20px'
    };
    const [confirmNonee, setConfirmNonee] = useState(false);



    function copyText(id) {
        const textToCopy = document.getElementById(id).innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => toast.success("ID copiado!"))
            .catch(err => console.error('Erro ao copiar ID:', err));
    }

    const [newStudentVideo, setNewStudentVideo] = useState(null);

    const handleVideoChange = (e) => {
        const video = e.target.files[0];
        setNewStudentVideo(video);
    };



    return (
        <div className="container">
            <ToastContainer />
            <div id="contianer-icons">
                <a href="#textos" onClick={functionClickText}>
                    <img src={IconTexto} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickImage}>
                    <img src={IconImage} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickVideo}>
                    <img src={IconVideo} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickCronometro}>
                    <img src={IconCronometro} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClick={functionClickMetronomo}>
                    <img src={IconMetronomo} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClickCapture={functionClickFlashCard}>
                    <img src={IconFlashCard} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
                <a href="#" onClickCapture={functionClickVideoLocal}>
                    <img src={iconVideoDois} style={{ width: "40px", cursor: 'pointer' }} />
                </a>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <div id="detalhe-aula" style={{ display: 'none', marginBottom: '100px' }}>
                        <label className="form-label">Título:</label>
                        <input className="form-control" type="text" value={tituloAula} onChange={(e) => setTituloAula(e.target.value)} />

                        <label className="form-label">Descrição:</label>
                        <input className="form-control" type="text" value={descricaoAula} onChange={(e) => setDescricaoAula(e.target.value)} />

                    </div>
                    <div className="containerTexto" id="textos">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto1} onChange={(e) => setTexto1(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto1} onChange={(e) => setTempoTexto1(e.target.value)} placeholder="Tempo para Texto 1" />

                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem1(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem1} onChange={(e) => setTempoImagem1(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div>
                    {/* <div className="containerVideoItem">
                        <label className="form-label mt-2">Vídeoo:</label>
                        <input type="file" className="form-control" onChange={(e) => setVideoFile(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoVideo} onChange={(e) => setTempoVideo(e.target.value)} placeholder="Tempo para Vídeo" />
                    </div> */}


                    <div className="containerVideo">
                        <label className="form-label mt-2">Vídeo YT :</label>
                        <input type="text" className="form-control" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Adicione aqui o Link do vídeo do Youtube" />
                        <input type="number" className="form-control mt-1" value={tempoVideo} onChange={(e) => setTempoVideo(e.target.value)} placeholder="Tempo vídeo 01" />
                    </div>

                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro1} onChange={(e) => setTempoCronometro1(e.target.value)} placeholder="Tempo Cronometro 1" />
                    </div>

                    <div className="containerMetronomo">
                        <label className="form-label mt-2">Metrônomo :</label>
                        <input type="number" className="form-control" value={tempoMetronomo1} onChange={(e) => setTempoMetronomo1(e.target.value)} placeholder="Tempo Metrônomo 1" />
                    </div>

                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard1} onChange={(e) => setTempoFlashCard1(e.target.value)} placeholder="Tempo FlashCard 1" />
                    </div>


                    {/* <div>
                        <label>Vídeo (local):</label>
                        <input type="file" accept="video/*" onChange={handleVideoChange} />
                    </div> */}















                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro2} onChange={(e) => setTempoCronometro2(e.target.value)} placeholder="Tempo Cronometro 2" />
                    </div>

                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro3} onChange={(e) => setTempoCronometro3(e.target.value)} placeholder="Tempo Cronometro 2" />
                    </div>

                    <div className="containerCronometro">
                        <label className="form-label mt-2">Cronometro :</label>
                        <input type="number" className="form-control" value={tempoCronometro4} onChange={(e) => setTempoCronometro4(e.target.value)} placeholder="Tempo Cronometro 2" />
                    </div>







                    {/* <label>Áudio 01:</label>
                    <input />
                    <input type="number" placeholder="Tempo para áudio 01" /> */}

                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto2} onChange={(e) => setTexto2(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto2} onChange={(e) => setTempoTexto2(e.target.value)} placeholder="Tempo para Texto 2" />
                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem2(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem2} onChange={(e) => setTempoImagem2(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard2} onChange={(e) => setTempoFlashCard2(e.target.value)} placeholder="Tempo FlashCard 1" />
                    </div>














                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard3} onChange={(e) => setTempoFlashCard3(e.target.value)} placeholder="Tempo FlashCard 1" />
                    </div>
                    <div className="containerFlashCard">
                        <label className="form-label mt-2">FlashCard:</label>
                        <input type="number" className="form-control" value={tempoFlashCard4} onChange={(e) => setTempoFlashCard4(e.target.value)} placeholder="Tempo FlashCard 1" />
                    </div>



                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto3} onChange={(e) => setTexto3(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto3} onChange={(e) => setTempoTexto3(e.target.value)} placeholder="Tempo para Texto 2" />
                    </div>

                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto4} onChange={(e) => setTexto4(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto4} onChange={(e) => setTempoTexto4(e.target.value)} placeholder="Tempo para Texto 4" />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto5} onChange={(e) => setTexto5(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto5} onChange={(e) => setTempoTexto5(e.target.value)} placeholder="Tempo para Texto 5" />
                    </div>
                    <div className="containerTexto">
                        <label className="form-label">Texto:</label>
                        <input type="text" className="form-control" value={texto6} onChange={(e) => setTexto6(e.target.value)} />
                        <input type="number" className="form-control mt-1" value={tempoTexto6} onChange={(e) => setTempoTexto6(e.target.value)} placeholder="Tempo para Texto 6" />
                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem3(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem3} onChange={(e) => setTempoImagem3(e.target.value)} placeholder="Tempo para Imagem3" />
                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem4(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem4} onChange={(e) => setTempoImagem4(e.target.value)} placeholder="Tempo para Imagem4" />
                    </div>

                    <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem3(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem3} onChange={(e) => setTempoImagem3(e.target.value)} placeholder="Tempo para Imagem3" />
                    </div>
                    {/* <div className="containerImagemItem">
                        <label className="form-label mt-2">Imagem 4:</label>
                        <input type="file" className="form-control" onChange={(e) => setImagem4(e.target.files[0])} />
                        <input type="number" className="form-control mt-1" value={tempoImagem4} onChange={(e) => setTempoImagem4(e.target.value)} placeholder="Tempo para Imagem 1" />
                    </div> */}
                </div>



                {/* Campos para Texto 2, Imagem 2, Vídeo YT 02, e Cronometro 02 */}
                {/* Campos para Texto 3, Imagem 3, Vídeo YT 03, e Cronometro 03 */}
                {/* Campos para FlashCard 2 e 3 */}

                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>

            <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id} style={{ listStyle: 'none', margin: '25px 0' }}>
                            <h6>Título: {item.tituloAula}</h6>
                            <h6>Descrição: {item.descricaoAula}</h6>
                            <h6>ID: <span id={`id-${item.id}`} onClick={() => copyText(`id-${item.id}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{item.id}</span></h6>
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)}><a href="#subir">Apresentar</a></button>
                            <button className="btn btn-primary ms-2 style-button" onClick={() => handleChangeId(item.id, generateRandomId())}>Trocar ID</button>
                        </li>
                    ))}
                </ul>

            </div>

            {/* <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.id}
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)} ><a href="#apresentacao-aula">Apresentar</a></button>
                            <button className="btn btn-primary ms-2 style-button" onClick={() => handleChangeId(item.id)} >Trocar ID</button>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* <div id="aulas-disponiveis">
                <h2 className="mt-4">Aulas Disponíveis:</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.id}
                            <button className="btn btn-secondary ms-2 style-button" onClick={() => handlePresent(item.id)} ><a href="#apresentacao-aula">Apresentar</a></button>
                        </li>
                    ))}
                </ul>
            </div> */}

            {/* <button onClick={() => setVirarAula(!virarAula)}>Virar Aula</button> */}


            <div id="subir" style={{ marginLeft: '-7px', background: 'white', height: '100%', width: '100%', position: 'absolute', top: '0px', zIndex: '0', display: containerNone ? 'block' : 'none' }}>
                <div id="apresentacao-aula" style={{ transform: `rotate(${rotacao}deg)` }} ></div>

                {/* Divs para os cronômetros */}
                <div id="apresentacao-cronometro-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }} >
                    <Cronometro />
                </div>
                <div id="apresentacao-cronometro-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Cronometro />
                </div>
                <div id="apresentacao-cronometro-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Cronometro />
                </div>

                {/* Divs para os metrônomos */}

                <div id="apresentacao-metronomo-1" className="mt-4" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-400px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                <div id="apresentacao-metronomo-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>
                <div id="apresentacao-metronomo-3" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <Metronomo />
                </div>

                {/* Divs para os FlashCards */}
                <div id="apresentacao-flashcard-1" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCard />
                </div>
                <div id="apresentacao-flashcard-2" style={{ display: "none", transform: `rotate(${rotacao}deg)`, marginTop: '-200px', width: '100%', height: '100%' }}>
                    <FlashCard />
                </div>
                {confirmNonee ?
                    <div className="container" style={{ position: 'absolute', display: 'flex', margin: 'auto', top: '110px', backgroundColor: 'white' }}>
                        <div style={{ margin: 'auto' }}>
                            <p style={{ textAlign: 'center' }}>Deseja fechar a aula ?</p>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <button className="btn btn-primary mr-" style={{ width: '120px', margin: '10px' }} onClick={() => setContainerNone(!containerNone)}>Sim</button>
                                <button className="btn btn-secondary" style={{ width: '120px', margin: '10px' }} onClick={() => setConfirmNonee(!confirmNonee)}>Não</button>
                            </div>
                        </div>
                    </div>
                    : ""

                }


                <div style={{ position: 'absolute', width: '100%', display: 'flex', right: '0px', bottom: '0px', justifyContent: 'space-around' }}>
                    <button onClick={toggleRotacao} style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={IconDeitarTela} style={{ width: '20px' }} />
                    </button> {/* Botão para alternar a rotação */}

                    <button onClick={() => setConfirmNonee(!confirmNonee)} style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={IconDiminuir} style={{ width: '20px' }} />
                    </button>
                </div>
            </div>
            {/* Divs para os FlashCards 2 e 3 */}
        </div>
    );
}
