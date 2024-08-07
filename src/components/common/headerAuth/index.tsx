/* eslint-disable @next/next/no-img-element */
import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "@/src/services/profileService";

// Define o elemento onde o modal será montado
Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await profileService.fetchCurrent();
        if (user?.firstName && user?.lastName) {
          setInitials(user.firstName[0] + user.lastName[0]);
        } else {
          console.error('User data is missing or incomplete:', user);
          setInitials('NA');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setInitials('NA');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <Container className={styles.nav}>
      <Link href="/home">
        <img
          src="/logoUrl.svg"
          alt="Vocabely Logo"
          className={styles.imgLogoNav}
        />
      </Link>
      <div className="d-flex align-items-center">
        <Form onSubmit={handleSearch}>
          <Input
            name="search"
            type="search"
            placeholder="Pesquisar"
            value={searchName}
            className={styles.input}
            onChange={(event) => setSearchName(event.currentTarget.value.toLowerCase())}
          />
        </Form>
        <img
          src="/homeAuth/iconSearch.svg"
          alt="Ícone de Pesquisa"
          className={styles.searchImg}
          onClick={handleSearch}
        />
        <p className={styles.userProfile} onClick={handleOpenModal}>
          {loading ? "Carregando..." : initials}
        </p>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        className={styles.modal}
        overlayClassName={styles.overlayModal}
      >
        <Link href="/profile">
          <p className={styles.modalLink}>Meus Dados</p>
        </Link>
        <p className={styles.modalLink} onClick={handleLogout}>
          Sair
        </p>
      </Modal>
    </Container>
  );
};

export default HeaderAuth;
