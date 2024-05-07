import Image from 'next/image';
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { getDocs, collection, getDoc, doc, Firestore } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import styles from "@/styles/Detail.module.css";

interface StudentData {
    code: string | undefined;
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
             students2: un 
        }
    };
};

const ProductDetail: React.FC<ProductDetailProps> = ({ students2 }) => {
    return ( 
        <> 
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
                    <h3> รหัส : {students2.code}</h3>
                    <h3> วันที่ปลูก : {students2['วันที่ปลูก']}</h3>
                    <h3> วันที่ย้าย : {students2['วันที่ย้าย']}</h3>
                    <h3> วันที่แหล่งที่มา : {students2.resoure}</h3>
                    <h3> อาหาร : {students2['อาหาร']}</h3>
                    <h3> ลักษณะ : {students2['ลักษณะ']}</h3>
                    <h3> ความกว้าง : {students2['ความกว้าง']}</h3>
                    <h3> ความยาว : {students2['ความยาว']}</h3>
                    <h3> หมายเหตุ : {students2['หมายเหตุ']}</h3>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
