import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import styles from '@/styles/Detail.module.css';
import Link from 'next/link';

interface StudentData {
  code: string;
  ชื่อ: string;
  วันที่ปลูก: string;
  วันที่ย้าย: string;
  resoure: string;
  อาหาร: string;
  ลักษณะ: string;
  ความกว้าง: string;
  ความยาว: string;
  หมายเหตุ: string;
  วันที่อัพเดท: string;
  title: string;
  image: string;
  id: string;
}

interface StudentPageProps {
  students: StudentData[];
}

const StudentPage: React.FC<StudentPageProps> = ({ students: initialStudents }) => {
  const router = useRouter();
  const [students, setStudents] = React.useState<StudentData[]>(initialStudents);

  return (
    <main>
      <Head>
        <title>Students Details</title>
      </Head>
      <div className={styles.names}>
        <h1>กล้วยไม้</h1>
      </div>
      <div className={styles.container}>
        {students.map((student) => (
          <div key={student.id} className={styles.detail} style={{ marginBottom: "20px" }}>
            <Link href={`/product/${student.id}`}>
              <Image src={student.image} width={300} height={300} alt={student.ชื่อ} style={{ marginBottom: "20px" }} />
            </Link>
            <h5>ชื่อ: {student.ชื่อ}</h5>
            <h5>รหัส: {student.code}</h5>
            <h5>วันที่ปลูก: {student.วันที่ปลูก}</h5>
            <h5>วันที่ย้าย: {student.วันที่ย้าย}</h5>
            <h5>แหล่งที่มา: {student.resoure}</h5>
            <h5>อาหาร: {student.อาหาร}</h5>
            <h5>ลักษณะ: {student.ลักษณะ}</h5>
            <h5>ความกว้าง: {student.ความกว้าง}</h5>
            <h5>ความยาว: {student.ความยาว}</h5>
            <h5>วันที่อัพเดท: {student.วันที่อัพเดท}</h5>
            <h5 style={{ marginBottom: "30px" }}>หมายเหตุ: {student.หมายเหตุ}</h5>
            <Button variant="outline-primary" onClick={() => router.push(`/qrcode/${student.id}`)} style={{ marginLeft: "50px", width: "200px" }} >
              Go to QR Code
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ชื่อ } = context.params!;
  const studentsQuery = query(
    collection(db, 'students'),
    where('ชื่อ', '==', ชื่อ as string),
    orderBy('วันที่อัพเดท','desc')
  );
  const querySnapshot = await getDocs(studentsQuery);

  const students: StudentData[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as StudentData;
    data.id = doc.id; // Ensure we capture the document ID
    students.push(data);
  });

  return {
    props: {
      students,
    },
  };
};

export default StudentPage;
