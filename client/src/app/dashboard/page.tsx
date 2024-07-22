"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeEvent, useEffect, useState } from "react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

type Product = {
  id: number;
  name: string;
  brand: string;
  model: string;
  color: string;
  price: number;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(await response.json());
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
      // Process the data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="h-max min-h-screen bg-stone-100">
      <div className="mx-auto max-w-screen-2xl rounded-md bg-white">
        <div className="flex items-center justify-between gap-4 px-12 py-8">
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <Input
            className="max-w-screen-md"
            placeholder="Filtrar"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          <Button onClick={() => fetchData()}>Atualizar</Button>
        </div>

        <div className="mx-auto flex max-w-screen-md items-center justify-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead className="text-right">Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{product.color}</TableCell>
                    <TableCell className="text-right">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.price)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
