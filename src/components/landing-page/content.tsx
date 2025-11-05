"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { LayoutTextFlipDemo } from '../anmetedUI/sign-upText';

type Props = {}

const Content = (props: Props) => {
 const router = useRouter();

  return (
    <div className="content">
           <LayoutTextFlipDemo />
          <p>
            Every drop counts. Your donation saves lives. Join our mission to
            ensure safe blood is always available.
          </p>
          <div className="cta-buttons">
            {/* <Button className="btn primary h-13" onClick={() => router.push('/donate')}>
              Donate
            </Button> */}
            <Button className="btn secondary h-13" onClick={() => router.push('/availablity')}>
              Find <b>Blood</b>
            </Button>
            {/* <button className="btn secondary">Find Blood</button> */}
          </div>
        </div>
  )
}

export default Content