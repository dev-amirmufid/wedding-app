
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const DashboardBox = ({title, value, text, body, moreDetails, className}) => {
  return (
  <Card className={`${className} w-full text-center`}>
      <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography variant="h5" color="blue-gray" className="flex items-center gap-2">
              {title}
          </Typography>
      </CardHeader>
      <CardBody className="min-h-[10rem] relative flex flex-col">
        <div className='m-auto'>
          {body ? <>
            {body}
          </> : value && 
            <>
            <Typography color="blue-gray" className="">
              {text}
            </Typography>
            
            <Typography variant="h2">{value}</Typography>
            </>
          }
        </div>
      </CardBody>
      {moreDetails && 
        <CardFooter className="pt-0">
            <Button size="sm" onClick={moreDetails?.onClick} className="w-full">
                {moreDetails?.label}
            </Button>
        </CardFooter>
      }
  </Card>
  );
}

export default DashboardBox;
