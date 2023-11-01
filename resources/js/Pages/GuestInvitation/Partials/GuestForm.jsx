import { router, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {
    Input,
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "@material-tailwind/react";

export default function GuestForm({ title, subtitle, selectedData }) {
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
      name : selectedData?.name || '',
      phone : selectedData?.phone || '',
      email : selectedData?.email || '',
      total_attendees : selectedData?.total_attendees || 1
    });

    const submit = (e) => {
        e.preventDefault();
        // if(selectedData){
        //   put(route('guest.update',{
        //     id: selectedData.id
        //   }));
        // } else {
        //   post(route('guest.store'));
        // }
    };

    return (
      <Card className="h-full w-full p-2 sm:p-6">
        <form onSubmit={submit}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8">
              <div>
                {title && <Typography variant="h5" color="gray" className="text-lg font-medium">{title}</Typography>}
                {subtitle && <Typography color="gray" className="mt-1 text-sm">{subtitle}</Typography>}
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0 p-4 space-y-6 max-w-xl">
            <section>
                <Input 
                    type="text"
                    size="lg" 
                    label="Name" 
                    value={data.name}
                    autoComplete="name"
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name ? true : false}
                />
                
                {errors.name && 
                  <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                      {errors.name}
                  </Typography>
                }
            </section>
            
            <section>
                <Input 
                    type="text"
                    size="lg" 
                    label="Phone" 
                    value={data.phone}
                    autoComplete="phone"
                    onChange={(e) => setData('phone', e.target.value)}
                    error={errors.phone ? true : false}
                />
                
                {errors.phone && 
                  <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                      {errors.phone}
                  </Typography>
                }
            </section>
            
            <section>
                <Input 
                    type="email"
                    size="lg" 
                    label="Email" 
                    value={data.email}
                    autoComplete="email"
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email ? true : false}
                />
                
                {errors.email && 
                  <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                      {errors.email}
                  </Typography>
                }
            </section>
            
            <section>
                <Input 
                    type="number"
                    size="lg" 
                    label="Jumlah Undangan" 
                    value={data.total_attendees}
                    autoComplete="total_attendees"
                    onChange={(e) => setData('total_attendees', e.target.value)}
                    error={errors.total_attendees ? true : false}
                />
                
                {errors.total_attendees && 
                  <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                      {errors.total_attendees}
                  </Typography>
                }
            </section>
          </CardBody>
          <CardFooter className="flex items-center justify-end gap-3 border-t border-gray-50 p-4">
            <Button
              // onClick={()=>router.get('/guest',{},{replace:true})} 
              size="sm" 
              color="red" 
              variant="text" 
              className="rounded-md"
            >Cancel</Button>
            <Button type="submit" disabled={processing} size="sm">Save</Button>
            
            <Transition
                show={recentlySuccessful}
                enterFrom="opacity-0"
                leaveTo="opacity-0"
                className="transition ease-in-out"
            >
                <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
          </CardFooter>
        </form>
      </Card>
    );
}
