import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "antd";
import { Product } from "./product/product";

export default function Home() {
  return (
      <div className="App">
          <Product/>
      </div>
  );
}
