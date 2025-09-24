import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  value: string
  title: string
  text: string
  register: UseFormRegister<FieldValues>
  user_type: 'docs' | 'user'
  setUserType: React.Dispatch<React.SetStateAction<'docs' | 'user'>>
}

const UserTypeCard = ({
  value,
  text,
  title,
  register,
  user_type,
  setUserType,
}: Props) => {
  const { showUser_type, methods } = useSignUpForm()

  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          'w-full cursor-pointer',
          user_type === value && 'border-orange'
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                'flex justify-center p-3',
                user_type === value && 'border-orange'
              )}
            >
              <User
                size={30}
                className={cn(
                  user_type === value ? 'text-orange' : 'text-gray-400'
                )}
              />
            </Card>
            <div>
              <CardDescription className="text-iridium">
                {title}
              </CardDescription>
              <CardDescription className="text-gray-400">
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                'w-4 h-4 rounded-full border',
                user_type === value ? 'bg-orange border-orange' : 'bg-transparent border-gray-400'
              )}
            />
            <Input
              type="radio"
              id={value}
              value={value}
              className="hidden"
              {...register("user_type", {
                onChange: (e) => {
                  console.log(e.target.value);
                  console.log(methods.watch('user_type'));
                  return setUserType(e.target.value as 'docs' | 'user');
                  
                  
                  // showUser_type()
                },
              })}
            />
          </div>
        </CardContent>
      </Card>
    </Label>
  )
}

export default UserTypeCard
