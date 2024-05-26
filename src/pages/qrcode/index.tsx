import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import styles from '@/styles/Product.module.css';
import Link from 'next/link';
import QRCode from 'qrcode.react';
import { Button } from 'react-bootstrap';

// Define the interface to receive data
interface Student {
  id: string;
  image: string;
  ชื่อ: string; // I'm assuming this is Thai for "name" 
  code: string;
}

// Fetch data from Firestore
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
    // ดึงข้อมูล firebase มาใช้
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []); 

  // Print command
  const handlePrint = () => {
    window.print();
  }; 

  // Display data and print button
 //ด฿งข้อมูลมาใช้ กด ปุ้มก็ปริ้น ทั้งหน้า
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <main>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft:"100px" }}>
          {userData.map((student) => (
            <div key={student.id} style={{ width: '30%' }}>
              <QRCode value={`https://orchilds.vercel.app/product/${student.id}`} />
              <p>{student.ชื่อ} ขวดที่ {student.code}</p> 
            </div>
          ))}
        </div> 
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:"10px" }}>
          <Button variant="outline-primary"  onClick={handlePrint}>Print Page</Button>
        </div>
      </main>
    </div>
  );
}
