"use client";

import { useEffect, useState } from "react";
import { getCurrentVoting, addVote } from "@/services/Web3Services";
import { useRouter } from "next/navigation";
import Head from "next/head";

const DEFAULT_OPTION = {
  name: "Loading...",
  image:
    "https://www.shutterstock.com/image-vector/unknown-male-user-secret-identity-600nw-2055592583.jpg",
};

export default function Vote() {
  const { push } = useRouter();

  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState({ maxDate: Date.now() });
  const [option1, setOption1] = useState(DEFAULT_OPTION);
  const [option2, setOption2] = useState(DEFAULT_OPTION);
  const [showVotes, setShowVotes] = useState(0);

  console.log("message:", message);
  console.log("voting:", voting);
  console.log("option1:", option1);
  console.log("option2:", option2);
  console.log("showVotes:", showVotes);

  useEffect(() => {
    if (!localStorage.getItem("wallet")) return push("/");
    showAllVotes();
  }, []);

  const showAllVotes = async () => {
    try {
      const currentVotes = await getCurrentVoting();
      debugger;
      console.log("currentVotes", currentVotes);
      setVoting(currentVotes);
      setOption1(getOptions(currentVotes.option1));
      setOption2(getOptions(currentVotes.option2));
    } catch (error) {
      debugger;


      
      console.error(error);
      setMessage(error.message);
    }
  };

  const btnVote2Click = async () => {
    setMessage("Conectando na carteira...aguarde...");
    try {
      await addVote(2);
      debugger;
      setShowVotes(2);
      setMessage("Voto computado com sucesso");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const btnVote1Click = async () => {
    setMessage("Conectando na carteira...aguarde...");
    try {
      await addVote(1);
      debugger;
      setShowVotes(1);
      setMessage("Voto computado com sucesso");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const getOptions = (option) => {
    switch (option) {
      case "Neto":
        return {
          name: "Neto",
          image:
            "https://tudosobrecachorros.com.br/wp-content/uploads/pinscher-chihuahua-400x282.jpg.webp",
        };
      case "May":
        return {
          name: "May",
          image:
            "https://tudosobrecachorros.com.br/wp-content/uploads/chihuahua-pinscher-366x400.jpg.webp",
        };
      default:
        return DEFAULT_OPTION;
    }
  };

  return (
    <>
      <Head>
        <title>Votação Web Depp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container col-xxl-8 px-4 py-5">
        <div className="row align-items-center">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Votação Web Depp
          </h1>
          <p className="lead">Votação na blockchain</p>
          {voting.maxDate > Date.now() / 1000 ? (
            <p className="lead mb-3">
              Seu voto está disponível até
              {new Date(Number(voting.maxDate) * 1000).toLocaleString()} para
              ser submetido abaixo
            </p>
          ) : (
            <p className="lead mb-3">Votação encerrada</p>
          )}
        </div>

        <div className="row align-items-center justify-content-center g-1 py-5">
          <div className="col-1"></div>

          <div className="col-5">
            <h3 className="my-2 d-block max-auto" style={{ width: 250 }}>
              {voting.option2}
            </h3>

            <div className="flex-column align-items-center justify-content-center">
              <img
                src={option2.image}
                alt={"Voto 2"}
                className="d-block mx-auto img-fluid rounded"
                style={{ width: 250, height: 250 }}
              />

              {showVotes > 0 || voting.maxDate < Date.now() / 1000 ? (
                <button
                  className="btn btn-secondary p-3 my-2 d-block max-auto"
                  style={{ width: 250 }}
                  disabled={true}
                >
                  {showVotes === 2
                    ? Number(voting.vote2) + 1
                    : Number(voting.vote2)}
                  votos
                </button>
              ) : (
                <button
                  className="btn btn-primary p-3 my-2 d-block max-auto"
                  onClick={btnVote2Click}
                  style={{ width: 250 }}
                >
                  Quero que este ganhe
                </button>
              )}
            </div>
          </div>

          <div className="col-5">
            <h3 className="my-2 d-block max-auto" style={{ width: 250 }}>
              {voting.option1}
            </h3>

            <div className="flex-column align-items-center justify-content-center">
              <img
                src={option1.image}
                alt={"Voto 2"}
                className="d-block mx-auto img-fluid rounded"
                style={{ width: 250, height: 250 }}
              />

              {showVotes > 0 || voting.maxDate < Date.now() / 1000 ? (
                <button
                  className="btn btn-secondary p-3 my-2 d-block max-auto "
                  style={{ width: 250 }}
                  disabled={true}
                >
                  {showVotes === 1
                    ? Number(voting.vote1) + 1
                    : Number(voting.vote1)}
                  votos
                </button>
              ) : (
                <button
                  className="btn btn-primary p-3 my-2 d-block max-auto"
                  onClick={btnVote1Click}
                  style={{ width: 250 }}
                >
                  Quero que este ganhe
                </button>
              )}
            </div>
          </div>
        </div>

        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">
            &copy; 2024 Votação Web Depp, Inc
          </p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">
                Início
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://github.com/web-depp"
                className="nav-link px-2 text-body-secondary"
              >
                GitHub
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
