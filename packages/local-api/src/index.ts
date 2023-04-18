const serve = (port: number, filename: string, dir: string) => {
  console.log(`Server is listening on port ${port} for ${dir}/${filename}`);
}

export default serve;