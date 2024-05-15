import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import styles from '@/styles/Product.module.css';
import Link from 'next/link';
import QRCode from 'qrcode.react';
import { Button } from 'react-bootstrap';

interface Student {
  id: string;
  image: string;
  ชื่อ: string; // I'm assuming this is Thai for "name" 
  code:string;
}

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "students"));
  const data: Student[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Student);
  });
  return data;
}

export default function Home() {
  const [userData, setUserData] = useState<Student[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);
  const handlePrint = () => {
    window.print();
  };
  return (
    <main>
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', marginRight:"-210px" }}>
  {userData.map((student) => (
    <div key={student.id} style={{ width: '20%', marginTop:"10px" }}>
     

       <QRCode value={`https://asdad-kanyarateve123s-projects.vercel.app/product/${student.id}`} />
       <p>{student.ชื่อ} ขวดที่ {student.code}</p> 

    </div>

  ))}
</div> 
<div style={{ display: 'flex', justifyContent: 'center', marginTop:"10px" }}>

      <Button variant="outline-primary"  onClick={handlePrint}>printpage</Button>

  </div>
    </main>
  );
}
