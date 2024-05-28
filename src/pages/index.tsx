import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import styles from '@/styles/Product.module.css';
import Link from 'next/link';
import QRCode from 'qrcode.react'; 
import { Button } from 'react-bootstrap';
//สร้าง interface ไว้รับค่า 
interface Student {
  id: string;
  image: string;
  ชื่อ: string; // I'm assuming this is Thai for "name" 
  code:string;
}
//ดึงข้อมูล collection students มาใช้
async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "students"));
  const data: Student[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Student);
  });
  return data;
}

export default function Home() { 
//ตั้งค่า userdat setUserData เอาไปเก็บที่ interface student
  const [userData, setUserData] = useState<Student[]>([]);

  useEffect(() => { 
    //ดึงข้อมูลจาก firebase
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []); 
  //คำสั่งปรั้น
  const handlePrint = () => {
    window.print();
  }; 
//ดึงค่าจาก firebaseมาใช้  เมื่อกด รูปภาพหรือชื่อ ให้ไปหน้า /product/[ชื่อ] จะเป็ชื่อของพันธ์ กดปุ้ม printpage ไปยังหน้า /qrcode
  return (
    <main>
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', marginRight:"-120px" }}> 
   
  {userData.map((student) => (
    <div key={student.id} style={{ width: '20%', marginTop:"10px" }}> 
  
      <Link href={`/product3/${student.ชื่อ}`}>
        <Image src={student.image} width={200} height={200} alt={student.ชื่อ} />
        
      </Link>  
      <p style={{ color: "black", textAlign:"center" ,marginLeft:"-125px", marginTop:"10px" }}>{student.ชื่อ}</p> 
      <div>
   <div style={{marginLeft:"50px"}}>
   <Link href={`/qrcode/${student.id}`}>
      <Button variant="outline-primary">qrcodebyid</Button>
    </Link>
   </div>
  </div> 
    
    </div>

  ))} 
</div> 
<div style={{ display: 'flex', justifyContent: 'center', marginTop:"40px" }}>
    <Link href={`/qrcode/`}>
      <Button variant="outline-primary">qrcodeall</Button>
    </Link>
  </div> 
 
    </main>
  );
}
