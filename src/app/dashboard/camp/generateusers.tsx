"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { generatSimpleUsers } from './generate'

type Props = {}

const GenerateUsers = (props: Props) => {
    const [loading, setLoading] = React.useState(false);
      const generateusers = async () => {
    try {
        setLoading(true);
    await generatSimpleUsers();
    } catch (error) {
        console.log(error);
        
    }finally{
    setLoading(false);

    }
  };
  return (
    <>
    <div>
        <Button disabled={loading} onClick={generateusers}>{loading ? "Generating..." : "Generate Users"}</Button>
    </div>
    </>
  )
}

export default GenerateUsers