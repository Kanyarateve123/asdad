import Image from 'next/image'
import React,{useEffect,useState} from 'react' 
import { getDocs,collection } from 'firebase/firestore'
import { db } from '@/firebaseconfig'  
// import styles from '@/styles/Home.module.css'
import styles from '@/styles/Product.module.css'
import Link from 'next/link';
async function fetchDataFromFirestores(){
   const querySnapshot = await getDocs(collection(db,"students")); 
   const data: { id: string; }[] = []; 
   querySnapshot.forEach((doc)=>{
    data.push({id:doc.id,...doc.data()})
   })
   return data;
}


export default function Home() {
  const [userData, setUserData] = useState([]);
  useEffect(()=>{
    async function FetchData() {
      const data:any = await fetchDataFromFirestores(); 
      setUserData(data );
    }
    FetchData();
  },[])
  return (
    <main >
     <div className={styles.container} >
           {userData.map((students:any)=>(  
            
            <div key={students['id']}>  
              <Link href ={'/product/'+students.id}> 
             
              <Image  className = {styles.img}src={students['image']} width={300} height={300} alt={students['ชื่อ']}/>
              <h2 className={styles.title}> {students['ชื่อ']}</h2>
              </Link>
            
            </div>
           )
           )

           } 
          
     </div>
    </main>
  )
}
