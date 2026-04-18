'use server'

import { prisma } from "@/lib/prisma"
import { refresh } from "next/cache"

 
export async function createPost(formData: FormData) {
    const nama = formData.get('nama') as string
    const ucapan = formData.get('ucapan') as string

    const res = await prisma.ucapan.create({
        data: {
            nama: nama,
            ucapan: ucapan,
        }
    })

    refresh()
}