import Image from 'next/image';
import Head from "next/head";
import React, { useEffect, useState , useRef} from 'react';
import { getDocs, collection, getDoc, doc, Firestore } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import styles from "@/styles/Detail.module.css"; 
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import { FC } from 'react'; 
import { saveAs } from 'file-saver';
//สร้าง interface มารับค่า
interface PostProps {
  id: string | string[] | undefined;
}
//สร้าง interface มารับค่า
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
    'วันที่อัพเดท':string | undefined; 
}
//สร้าง interface มารับค่า
interface ProductDetailProps {
    students2: StudentData; 
    id: string | string[] | undefined; 
    url: string|null;
}
//ตั้งค่า collection firebase คือ reference
const reference = collection(db, "students");
//สดึงข้อมูล database แล้วส่งออก ตามค่า id
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
//ดึงข้อมูลมาใช้ตาม id
const ProductDetail: React.FC<ProductDetailProps> = ({ students2 ,id}) => {  
    return ( 
        <>   
        
            <Head>
                <title>Product Detail</title>
            </Head>
         
            <div className={styles.names}> 
                <h1> กล้วยไม้</h1> 
            </div> 
        
            <div className={styles.container}>
                {students2.image && (
                    <div>
                        <Image src={students2.image} width={300} height={300} alt={students2.title || ''} />
                    </div>
                )}
                <div className={styles.detail}>
                <h5> ชื่อ : {students2['ชื่อ']}</h5>
                    <h5> รหัส : {students2.code}</h5> 
                  
                    <h5> วันที่ปลูก : {students2['วันที่ปลูก']}</h5>
                    <h5> วันที่ย้าย : {students2['วันที่ย้าย']}</h5>
                    <h5> วันที่แหล่งที่มา : {students2.resoure}</h5>
                    <h5> อาหาร : {students2['อาหาร']}</h5>
                    <h5> ลักษณะ : {students2['ลักษณะ']}</h5>
                    <h5> ความกว้าง : {students2['ความกว้าง']}</h5>
                    <h5> ความยาว : {students2['ความยาว']}</h5>
                    <h5> หมายเหตุ : {students2['หมายเหตุ']}</h5> 
                    <h5> วันที่อัพเดท : {students2['วันที่อัพเดท']}</h5> 
      
                    
           
            


                </div> 
         
            </div>
        </>
    );
};

export default ProductDetail;
