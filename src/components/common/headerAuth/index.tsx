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
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/search?name=${searchName}`);
		setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
		setSearchName("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await profileService.fetchCurrent();
        if (user && user.firstName && user.lastName) {
          const firstNameInitial = user.firstName.slice(0, 1);
          const lastNameInitial = user.lastName.slice(0, 1);
          setInitials(firstNameInitial + lastNameInitial);
        } else {
          console.error('User data is missing or incomplete:', user);
          setInitials('NA');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('Failed to load user data');
        setInitials('NA');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <Container className={styles.nav}>
      <Link href="/home">
        <img
          src="/logoVocabely.svg"
          alt="logoVocabely"
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
            onChange={(event) => {
              setSearchName(event.currentTarget.value.toLowerCase()); }}/>
        </Form>
        <img
          src="/homeAuth/iconSearch.svg"
          alt="lupaHeader"
          className={styles.searchImg}
          onClick={handleSearchClick}
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
