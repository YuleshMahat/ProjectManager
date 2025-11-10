"use client";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./CustomCard.module.css";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  image: string;
  information: string;
  buttonText?: string;
  navigation: string;
}

const CustomCard = ({
  title,
  image,
  information,
  buttonText = "Manage",
  navigation,
}: Props) => {
  const router = useRouter();
  return (
    <Card style={{ width: "20rem" }} className={style.mainColor}>
      <Card.Img
        variant="top"
        src={image}
        alt="image"
        className="p-4"
        style={{ height: "270px", width: "100%", objectFit: "contain" }}
      />
      <Card.Body className="mainTheme">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{information}</Card.Text>
        <Button
          className={`btn ${style.buttonColor}`}
          onClick={() => {
            router.push(navigation);
          }}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
