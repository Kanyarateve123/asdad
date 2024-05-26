import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseconfig';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import styles from '@/styles/Detail.module.css';

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
  title: string;
  image: string;
}

interface StudentPageProps {
  students: StudentData[];
}

const StudentPage: React.FC<StudentPageProps> = ({ students }) => {
  const router = useRouter();

  if (students.length === 0) {
    return <p>No data found</p>;
  }

  return (
    <main>
      <Head>
        <title>Students Details</title>
      </Head>
      <div className={styles.names}>
        <h1>กล้วยไม้</h1>
      </div>
      <div className={styles.container}>
        {students.map((student, index) => (
          <div key={index} className={styles.detail}>
            {student.image && (
              <div>
                <Image src={student.image} width={300} height={300} alt={student.title || ''} />
              </div>
            )}
            <h5>ชื่อ: {student.ชื่อ}</h5>
            <h5>รหัส: {student.code}</h5>
            <h5>วันที่ปลูก: {student.วันที่ปลูก}</h5>
            <h5>วันที่ย้าย: {student.วันที่ย้าย}</h5>
            <h5>แหล่งที่มา: {student.resoure}</h5>
            <h5>อาหาร: {student.อาหาร}</h5>
            <h5>ลักษณะ: {student.ลักษณะ}</h5>
            <h5>ความกว้าง: {student.ความกว้าง}</h5>
            <h5>ความยาว: {student.ความยาว}</h5>
            <h5>หมายเหตุ: {student.หมายเหตุ}</h5>
            <Button variant="outline-primary" onClick={() => router.push('/qrcode')}>
              Go to QR Code
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params!;
  const studentsQuery = query(collection(db, 'students'), where('code', '==', code as string));
  const querySnapshot = await getDocs(studentsQuery);

  const students: StudentData[] = [];
  querySnapshot.forEach((doc) => {
    students.push(doc.data() as StudentData);
  });

  return {
    props: {
      students,
    },
  };
};

export default StudentPage;
