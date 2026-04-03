"use client";

import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="p-2">
      <h1 className="text-primary">Clinico</h1>
      <p className="text-secondary">Welcome to the Clinico app!</p>
      <Button variant="default" onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
      <Button variant="secondary" onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
      <Button variant="success" onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
      <Button variant="warning" onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
      <Button variant="danger" onClick={() => alert("Button clicked!")}>
        Click Me
      </Button>
     
    </main>
  );
}
