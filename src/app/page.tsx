"use client";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FormEvent, useState } from "react";
import FightModel from "@/types/fighter";

interface FormData {
  [key: string]: string;
}

export default function Home() {
  // const fightModel = new FightModel()
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      localStorage.setItem("data", JSON.stringify(formData));
      console.log("enviado a la siguiente pagina");
      router.push("/point");
      // fightModel.save(
      //   {
      //     id: '2',
      //     competitors : [
      //       {
      //         name: formData.competitor_one,
      //         points: 0
      //       },
      //       {
      //         name: formData.competitor_two,
      //         points: 0
      //       }
      //     ],
      //     timer: Number(formData.timer)}
      // )
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleFormPoint = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const queryParams = new URLSearchParams(formData).toString()
  //   router.push(`/point?${queryParams}`)
  // }

  return (
    <div className="min-h-[100vh] md:grid place-content-center md:container md:m-auto p-3">
      <Card className="">
        <CardHeader>Nombre y apellidos de los contrincantes:</CardHeader>
        <CardBody>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4">
              <Input
                type="text"
                name="competitor_one"
                label="Competidor uno:"
                placeholder="Ingrese el nombre del competidor uno"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="competitor_two"
                label="Competidor dos:"
                placeholder="Ingrese el nombre del competidor dos"
                onChange={handleInputChange}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  name="minutes"
                  label="Minutos:"
                  placeholder="Ingrese los minutos"
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  name="seconds"
                  label="Segundos:"
                  placeholder="Ingrese los segundos"
                  onChange={handleInputChange}
                />
              </div>
              <Button color="primary" type="submit" isDisabled={loading}>
                Enviar
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

// <div className="mt-[100px] m-auto container">
//   <div className="">
//     <h1 className="text-xl">Ingrese los datos de los peleadores:</h1>
//     <form onSubmit={handleFormPoint}>
//       <div>
//         <label htmlFor="competitor_one">Peleador A</label><br/>
//         <input
//           id="competitor_one"
//           className="text-black"
//           type="text"
//           name="competitor_one"
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="competitor_two">Peleador B</label><br/>
//         <input
//           id="competitor_two"
//           className="text-black"
//           type="text"
//           name="competitor_two"
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="timer">Tiempo de pelea</label><br/>
//         <input
//           id="timer"
//           className="text-black"
//           type="text"
//           name="timer"
//           onChange={handleInputChange}
//         />
//       </div>
//       {/* <button>Enviar</button> */}
//     </form>
//   </div>
// </div>
