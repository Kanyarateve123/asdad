import Image from 'next/image';
import Head from "next/head";
import React, { useEffect, useState, useRef } from 'react';
import { getDocs, collection, getDoc, doc, Firestore } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import styles from "@/styles/Detail.module.css";
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';

interface PostProps {
  id: string | string[] | undefined;
}

interface StudentData {
  code: string | undefined;
  'ชื่อ': string | undefined;
  'วันที่ปลูก': string | undefined;
  'วันที่ย้าย': string | undefined;
  resoure: string | undefined;
  'อาหาร': string | undefined;
  'ลักษณะ': string | undefined;
  'ความกว้าง': string | undefined;
  'ความยาว': string | undefined;
  'หมายเหตุ': string | undefined;
  title: string | undefined;
  image: string | undefined;
}

interface ProductDetailProps {
  students2: StudentData;
  id: string | string[] | undefined;
  url: string | null;
}

const reference = collection(db, "students");

export const getStaticPaths = async () => {
  const umuntu = await getDocs(reference);

  const paths = umuntu.docs.map(doc => {
    return {
      params: { id: doc.id }
    };
  });
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context: { params: { id: string; }; }) => {
  const id = context.params.id;
  const docRef = doc(db, "students", id);
  const data = await getDoc(docRef);
  const umuntuData = data.data();
  const un: StudentData = JSON.parse(JSON.stringify(umuntuData));

  return {
    props: {
      students2: un,
      id: id  // Pass the ID as a prop to the ProductDetail component
    }
  };
};

const QrcodeDetail: React.FC<ProductDetailProps> = ({ students2, id }) => {
  const qrCodeRef = useRef<any>(null);
  const url = `https://asdad-kanyarateve123s-projects.vercel.app/product/${id}`; // Construct the URL

  const exportQRCode = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.toCanvas({ type: 'image/png' }).then((canvas: HTMLCanvasElement) => {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            saveAs(blob, 'qr-code.png');
          }
        });
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>Qrcode print</title>
      </Head>

      <div className={styles.names}>
      
      </div>

      <div className={styles.container}>

        <div className={styles.detail}>
           <p style={{marginBottom:"40px"}}>  หมายเลขขวด : {students2.code}</p>

          <div style={{ display: "flex" }}>
            <QRCode id="qr-code-img" value={url}  />
          </div>
          <p> ชื่อ : {students2['ชื่อ']}</p>
          {/* Print Button */} 
          <button onClick={handlePrint} style={{marginTop:"40px"}}>Print QR Code</button>
        </div>

      </div>
    </>
  );
};

export default QrcodeDetail;
