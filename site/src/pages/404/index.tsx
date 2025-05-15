import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Página não encontrada 😕</p>
      <Link to="/" className={styles.backButton}>
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFound;
