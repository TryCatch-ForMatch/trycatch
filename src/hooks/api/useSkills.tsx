"use client"
import {useState, useEffect, useCallback} from "react"
import { apiTryCatch } from "@/lib/axios/axiosTryCatch"
import { ISkillsProps, IUserSkills } from "@/types/interface/ISkills"

export function useSkills(){
const [allSkills, setAllSkills]=useState<ISkillsProps[]>([])
const [allUserSkills, setAllUserSkills]= useState<IUserSkills[]>([])
const [loadingSkills, setLoadingSkills] = useState(false)


const fetchAllSkills= useCallback( async ()=>{
  setLoadingSkills(true)

  try{
    const response= await apiTryCatch.get("/skill")
    setAllSkills(response.data) 
  }catch(err){
    console.log(err)
  }finally{
    setLoadingSkills(false)
  }

}, [])


const userLoggedSkills = useCallback(async ()=>{
  setLoadingSkills(true)
  try{
    const response = await apiTryCatch.get("/user/me")
    setAllUserSkills(response.data.skills)
    return response.data.skills
    
  }catch(err){
    console.log(err)

  }finally{
    setLoadingSkills(false)
  }
}, [])

async function registerSkills( data:ISkillsProps){
  const response= await apiTryCatch.post("/skills", data)
  return response.data
}

useEffect(()=>{
  fetchAllSkills()
  userLoggedSkills()
}, [fetchAllSkills, userLoggedSkills])

return {
  allSkills,
  fetchAllSkills,
  loadingSkills,
  registerSkills,
  allUserSkills,
}

}