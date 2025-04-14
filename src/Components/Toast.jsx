import { addToast } from '@heroui/react';
export const  displayToast=(data)=>{
    addToast({
            hideIcon: true,
            title: "Success",
            description: data,
            classNames: {
              closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
            },
          });
}
