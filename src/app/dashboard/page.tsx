import { DataTableDemo } from '@/components/datatable/data-table'
import { DrawerDemo } from '@/components/sdcn/drawer'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <header>
            <div>
                <DrawerDemo/>
        This is auth layout
        </div>
        </header>
        <div>
            <DataTableDemo/>
        </div>
        <footer>
            footer
        </footer>
    </div>
  )
}

export default page