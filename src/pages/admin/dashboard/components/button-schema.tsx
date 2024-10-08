import { Button } from '@/components/button'
import ChevronIcon from '@/components/icon/chevron'
import { Typography } from '@/components/typhography'


const ButtonSchema = () => {
  return (
    <div className="flex flex-col gap-3">
    <Typography as="h3">Button</Typography>
    <div className="h-2 w-72 bg-burnt-orange-100" />

    <div className="grid grid-cols-4 py-2 gap-4">
      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          Navy
        </Typography>
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button>Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button rounded>Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button variant="outline">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button variant="text">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button disabled>Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          Burnt Orange
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="burnt-orange">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="burnt-orange" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="burnt-orange" variant="outline">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="burnt-orange" variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="burnt-orange" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button disabled>Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          Steel Blue
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" variant="outline">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button disabled>Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>

      <div className="bg-navy-60 shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-white">
          White
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="white">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Contain
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="white" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Contain - Rounded
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="white" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Text
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button disabled>Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Disabled
            </Typography>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          Navy
        </Typography>
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" variant="outline">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" disabled>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          Burnt Orange
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="burnt-orange">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="burnt-orange" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="burnt-orange" variant="outline">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="burnt-orange" variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="burnt-orange" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" disabled>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          Steel Blue
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="steel-blue">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="steel-blue" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="steel-blue" variant="outline">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="steel-blue" variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="steel-blue" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" disabled>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>

      <div className="bg-navy-60 shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-white">
          White
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="white">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Contain
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="white" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Contain - Rounded
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="white" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Text
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" disabled>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Disabled
            </Typography>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
        <Typography as="h4" className="text-navy-100">
          With Icon
        </Typography>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 flex justify-center">
            <Button loading rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Loading</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" LeftIcon={() => <ChevronIcon className="text-white" />} rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Left Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" RightIcon={() => <ChevronIcon className="text-white" rotate="right" />} rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Right Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button
              color="steel-blue"
              LeftIcon={() => <ChevronIcon className="text-white" />}
              RightIcon={() => <ChevronIcon className="text-white" rotate="right" />}
              rounded
            >
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Multiple Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" LeftIcon={() => <ChevronIcon className="text-white" />} className="" rounded />
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Only Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="navy" rounded badge={5}>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Badges</Typography>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ButtonSchema
