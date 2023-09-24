'use client'

import { useCallback } from "react"

export default function PDFReader(){

    // when a file is dropped in the dropzone, call the `/api/ai/add-data` API to train our bot on a new PDF file

    const onDrop = useCallback(async (acceptedFile: File[]) => {

    }, [])
}