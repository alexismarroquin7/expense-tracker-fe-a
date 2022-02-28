import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Section } from "../components";

export default function Transactions(){
  
  const dispatch = useDispatch();
  
  const { user } = useSelector(s => s.auth);

  useEffect(() => {
    
  }, []);

  return (
  <Section>

  </Section> 
  )
}