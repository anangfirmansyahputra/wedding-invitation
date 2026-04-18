'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const nama = formData.get('nama') as string
  const ucapan = formData.get('ucapan') as string
  const status = formData.get('status') as string

  if (!nama || !ucapan) {
    return {
      success: false,
      error: 'Nama dan ucapan harus diisi'
    }
  }

  try {
    const res = await prisma.ucapan.create({
      data: {
        nama: nama,
        ucapan: ucapan,
        status: status === 'Hadir' ? 'HADIR' : 'TIDAK_HADIR'
      }
    })

    revalidatePath('/')

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.error('Error creating wish:', error)
    return {
      success: false,
      error: 'Terjadi kesalahan saat mengirim ucapan'
    }
  }
}

export async function getUcapan() {
  try {
    const ucapan = await prisma.ucapan.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      data: ucapan.map(u => ({
        id: u.id,
        name: u.nama,
        message: u.ucapan,
        status: u.status === 'HADIR' ? 'Hadir' : 'Tidak Hadir',
        date: new Date(u.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        time: new Date(u.createdAt).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      }))
    }
  } catch (error) {
    console.error('Error fetching wishes:', error)
    return {
      success: false,
      error: 'Terjadi kesalahan saat mengambil ucapan'
    }
  }
}