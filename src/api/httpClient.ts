export const requestJson = async (url: string, action: string, options?: RequestInit): Promise<unknown> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error by ${action} - ${response.status}`);
  }
  return response.json();
};

export  const requestVoid = async (url: string, action: string, options?: RequestInit): Promise<void> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error by ${action} - ${response.status}`);
  }
};

export  const jsonOption = (method:"POST" | "PUT", body:any):RequestInit => {
    return {
        method,
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(body)
    }
}