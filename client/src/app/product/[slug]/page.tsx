"use client";

import { Product } from "@/app/dashboard/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [product, setProduct] = useState<Product>({} as Product);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/products/${params.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    console.log(form);

    const updatedProduct = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      brand: (form.elements.namedItem("brand") as HTMLInputElement).value,
      model: (form.elements.namedItem("model") as HTMLInputElement).value,
      color: (form.elements.namedItem("color") as HTMLInputElement).value,
      price: (form.elements.namedItem("price") as HTMLInputElement)
        .valueAsNumber,
    };

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/products/${params.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedProduct),
        },
      );
      if (response.ok) {
        alert("Produto atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 px-24 py-8">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="outline" className="sm:hidden">
            <div className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product.name}
          </h1>
        </div>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="default" size="sm" onClick={router.back}>
            Descartar
          </Button>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
              <CardDescription>
                Atualizar os detalhes do produto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6" onSubmit={handleSave}>
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    defaultValue={product.name}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    type="text"
                    className="w-full"
                    defaultValue={product.brand}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    type="text"
                    className="w-full"
                    defaultValue={product.model}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    type="text"
                    className="w-full"
                    defaultValue={product.color}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    type="number"
                    defaultValue={product.price}
                  />
                </div>

                <div className="grid gap-3">
                  <Button type="submit">Salvar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
