import LoginForm from "@/components/LoginForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Login to Portfolio Manager</h1>
      <LoginForm />
    </div>
  );
}
