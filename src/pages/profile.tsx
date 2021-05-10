import React, { useEffect, useState, ChangeEvent, Dispatch } from 'react';
import {
    Button, Form, FormGroup, Label, Input, Card, CardText, CardBody,
    CardTitle, Collapse
} from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Profile.module.css';
import { AddressesService, AuthService, sessionService } from 'services';
import { Address, Addresses, User } from 'types'
import { useRouter } from 'next/router';

const Profile: React.FC = (prop) => {
    const router = useRouter();

    const [oldPassword, setOldPassword]: [string, Dispatch<string>] = useState<string>();
    const [newPassword, setNewPassword]: [string, Dispatch<string>] = useState<string>();
    const [newName, setNewName]: [string, Dispatch<string>] = useState<string>();
    const [newSurname, setNewSurname]: [string, Dispatch<string>] = useState<string>();
    const [confirmNewPassword, setConfirmNewPassword]: [string, Dispatch<string>] = useState<string>();
    const [newEmail, setNewEmail]: [string, Dispatch<string>] = useState<string>();
    const [confirmNewEmail, setConfirmNewEmail]: [string, Dispatch<string>] = useState<string>();
    const [emailVerificationCode, setEmailVerificationCode]: [string, Dispatch<string>] = useState<string>();
    const [userEmail, setUserEmail]: [string, Dispatch<string>] = useState<string>();
    const [userEmailVerified, setUserEmailVerified]: [boolean, Dispatch<boolean>] = useState<boolean>();
    const [userName, setUserName]: [string, Dispatch<string>] = useState<string>();
    const [userSurname, setUserSurname]: [string, Dispatch<string>] = useState<string>();
    const [userUsername, setUserUsername]: [string, Dispatch<string>] = useState<string>();
    const [userRole, setUserRole]: [string, Dispatch<string>] = useState<string>();
    const [userDevices, setUserDevices]: [Array<any>, Dispatch<Array<any>>] = useState<Array<any>>();
    const [newAddressValues, setNewAddressValues]: [Address, Dispatch<Address>] = useState<Address>();
    const [addresses, setAddresses]: [Addresses, Dispatch<Addresses>] = useState<Addresses>();
    const [selectedAddress, setSelectedAddress]: [Address, Dispatch<Address>] = useState<Address>();
    const [selectedAddressId, setSelectedAddressId]: [string, Dispatch<string>] = useState<string>();
    const [isOpenAddress, setIsOpenAddress] = useState(false);
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isOpenDevices, setIsOpenDevices] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenProfileInfo, setIsOpenProfileInfo] = useState(false);

    const toggleAddress = () => setIsOpenAddress(!isOpenAddress);
    const togglePassword = () => setIsOpenPassword(!isOpenPassword);
    const toggleEmail = () => setIsOpenEmail(!isOpenEmail);
    const toggleProfileInfo = () => setIsOpenProfileInfo(!isOpenProfileInfo);
    const toggleDevices = () => setIsOpenDevices(!isOpenDevices);
    const toggleDelete = () => setIsOpenDelete(!isOpenDelete);

    useEffect(() => {
        setUserData();
        getAddresses();
    }, []);

    const setUserData = async (): Promise<void> => {
        const IS_AUTH = await AuthService.isAuthenticated();
        if (IS_AUTH) {
            const user: User = await AuthService.getCurrentUserData()
            setUserEmail(user.email);
            setUserName(user.name);
            setUserSurname(user.surname);
            setUserEmailVerified(user.email_verified);
            setUserUsername(user.username);
            setUserRole(user.role);
            AuthService.getDevicesList(setUserDevices);
        }
    }

    const getAddresses = async (): Promise<void> => {
        try {
            const addresses: Addresses = await AddressesService.fetchAddresses();
            setAddresses(addresses);
            console.log('Addresses', addresses);
        }
        catch (err) {
            console.log(err)
        }
    }

    const getSelectedAddress = async (id: string): Promise<void> => {
        try {
            const address: Address = await AddressesService.fetchSingleAddress(id);
            setSelectedAddress(address);
            console.log('Address', address);
        }
        catch (err) {
            console.log(err)
        }
    }

    const changeAddressValue = (fieldName: string, e: ChangeEvent<HTMLInputElement>): void => {
        setNewAddressValues({
            ...newAddressValues,
            [fieldName]: e.currentTarget.value
        });
    }

    const changeSelectedAddress = (e: ChangeEvent<HTMLSelectElement>): void => {
        console.log(e.target.value);
        setSelectedAddressId(e.target.value);
        getSelectedAddress(e.target.value);
    }

    const submitNewAddress = async (): Promise<void> => {
        await AddressesService.createNewAddress(newAddressValues)
            .then((newAddressId: string) => {
                if (newAddressId) {
                    getAddresses();
                    alert("Address added successfully!");
                }
                console.log(newAddressId)
            }).catch((e) => {
                console.log(e.message);
            })
    }

    const deleteAddress = async (): Promise<void> => {
        await AddressesService.deleteAddress(selectedAddressId)
            .then((response: boolean) => {
                if (response) {
                    getAddresses();
                    setSelectedAddress(null);
                    setSelectedAddressId(null);
                    alert("Address deleted successfully!");
                }
                console.log(response);
            }
            ).catch((e) => {
                console.log(e.message);
            })
    }

    const oldPasswordField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOldPassword(e.target.value);
    }

    const newPasswordField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPassword(e.target.value);
    }

    const confirmNewPasswordField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmNewPassword(e.target.value);
    }

    const newEmailField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEmail(e.target.value);
    }

    const confirmNewEmailField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmNewEmail(e.target.value);
    }

    const emailVerificationCodeField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmailVerificationCode(e.target.value);
    }

    const newNameField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewName(e.target.value);
    }

    const newSurnameField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewSurname(e.target.value);
    }

    const changePassword = async (): Promise<void> => {
        console.log(newPassword, confirmNewPassword, oldPassword);

        try {
            if(newPassword == confirmNewPassword)
                await AuthService.changePassword(oldPassword, newPassword);
            else
                console.error("Passwords don't match");
        }
        catch (err) {
            console.log(err)
        }
    }

    const changeEmail = async (): Promise<void> => {
        console.log(newEmail, confirmNewEmail);
        try {
            if(newEmail == confirmNewEmail){
                await AuthService.changeEmail(newEmail);
                await setUserData();
            }
            else
                console.error("Emails don't match");
        }
        catch (err) {
            console.log(err)
        }
    }

    const changeProfileInfo = async (): Promise<void> => {
        console.log(newName, newSurname);
        try {
            await AuthService.changeAccountAttributes(newName, newSurname);
            await setUserData();
        }
        catch (err) {
            console.log(err)
        }
    }

    const verifyEmail = async (): Promise<void> => {
        console.log(emailVerificationCode);
        try {
            await AuthService.verifyEmail(emailVerificationCode);
            await setUserData();
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteDevice = (deviceKey: string): void =>{
        AuthService.forgetSpecificDevice(deviceKey, () => AuthService.getDevicesList(setUserDevices));
    }

    const renderSelectedAddress = (): JSX.Element => {
        if (selectedAddress) {
            return (
                <p>
                    { selectedAddress.description}
                     - { selectedAddress.recipientName}
                    { selectedAddress.recipientSurname}
                     - { selectedAddress.address},
                    { selectedAddress.code},
                    { selectedAddress.city},
                </p>
            );
        }
        else {
            return (
                <p>Select an address</p>
            );
        }
    }


    return (
        <CustomerLayout header footer>
            <div>
                <h1>Profile</h1>
                <table className={styles.container}>
                    <tr>
                        <td>
                            <div>
                                <div>
                                    {userRole !== "Admin"? (
                                        <div>
                                            <div>
                                                <Button className={styles.link} onClick={toggleAddress}> » Here you can manage your address</Button>
                                            </div>
                                            <Collapse isOpen={isOpenAddress}>
                                                <div className={styles.div}>
                                                    <h2>Add a new one</h2>
                                                    <Form>
                                                        <Label>Name:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('recipientName', e) }} placeholder="Name" />
                                                        <Label>Surname:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('recipientSurname', e) }} placeholder="Surname" />
                                                        <Label>Address:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('address', e) }} placeholder="Address" />
                                                        <Label>City:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('city', e) }} placeholder="City" />
                                                        <Label>Province:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('district', e) }} placeholder="Province (TV)" />
                                                        <Label>CAP:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('code', e) }} placeholder="CAP" />
                                                        <Label>Description:</Label>
                                                        <Input type="text" onChange={(e) => { changeAddressValue('description', e) }} placeholder="House Address" />
                                                    </Form>
                                                    <br />
                                                    <Button size="lg" onClick={() => { submitNewAddress() }}>Add</Button>
                                                    <br />
                                                    <h2>Or delete an existing one</h2>
                                                    <select style={{ width: "20rem" }} defaultValue="#" onChange={(e) => { changeSelectedAddress(e) }}>
                                                        <option value='#'> - - - </option>
                                                        {addresses?.map((address: Address) => (
                                                            <option key={address.id} value={address.id}>{address.description}</option>
                                                        ))}
                                                    </select>
                                                    {renderSelectedAddress()}
                                                    <Button size="lg" onClick={deleteAddress}>Delete this address</Button>
                                                </div>
                                            </Collapse>
                                        </div>
                                    ):<></>
                                    }
                                    <div>
                                        <div>
                                            <Button className={styles.link} onClick={togglePassword}> » Here you can manage your password</Button>
                                        </div>
                                        <Collapse isOpen={isOpenPassword}>
                                            <div className={styles.div}>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="oldPassword">Old Password</Label>
                                                        <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { oldPasswordField(e); }} name="password" id="oldPassword" placeholder="Old Password" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="newPassword">New Password</Label>
                                                        <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { newPasswordField(e); }} name="newPassword" id="newPassword" placeholder="New Password" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="confirmNewPassword">Confirm New Password</Label>
                                                        <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { confirmNewPasswordField(e); }}
                                                            name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm New Password" />
                                                    </FormGroup>
                                                    <div>
                                                        <Button size="lg" onClick={() => { changePassword() }}>Change Password</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div>
                                        <div>
                                            <Button className={styles.link} onClick={toggleEmail}> » Here you can manage your email</Button>
                                        </div>
                                        <Collapse isOpen={isOpenEmail}>
                                            <div className={styles.div}>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="newEmail">New Email</Label>
                                                        <Input type="email" onChange={(e) => { newEmailField(e); }} name="newEmail" id="newEmail" placeholder="New Email" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="confirmNewEmail">Confirm New Email</Label>
                                                        <Input type="email" onChange={(e) => { confirmNewEmailField(e); }} name="confirmNewEmail" id="confirmNewEmail" placeholder="Confirm New Email" />
                                                    </FormGroup>
                                                    <div>
                                                        <Button size="lg" onClick={() => { changeEmail() }}>Change Email</Button>
                                                    </div>
                                                    {
                                                        !userEmailVerified? (
                                                            <>
                                                                <FormGroup>
                                                                    <Label for="emailVerificationCode">Verify {userEmail}</Label>
                                                                    <Input type="text" onChange={(e) => { emailVerificationCodeField(e); }} name="emailVerificationCode" id="emailVerificationCode" placeholder="Insert code" />
                                                                </FormGroup>
                                                                <div>
                                                                    <Button size="lg" onClick={() => { AuthService.sendEmailVerificationCode() }}>Resend code</Button>
                                                                </div>
                                                                <div>
                                                                    <Button size="lg" onClick={() => { verifyEmail() }}>Verify Email</Button>
                                                                </div>
                                                            </>
                                                        ): (<></>)
                                                    }
                                                    
                                                </Form>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div>
                                        <div>
                                            <Button className={styles.link} onClick={toggleProfileInfo}> » Here you can manage your personal info</Button>
                                        </div>
                                        <Collapse isOpen={isOpenProfileInfo}>
                                            <div className={styles.div}>
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="newName">New Name</Label>
                                                        <Input type="email" onChange={(e) => { newNameField(e); }} name="newName" id="newName" placeholder={newName} value={newName} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="newSurname">New Surname</Label>
                                                        <Input type="email" onChange={(e) => { newSurnameField(e); }} name="newSurname" id="newSurname" placeholder={newSurname} value={newSurname} />
                                                    </FormGroup>
                                                    <div>
                                                        <Button size="lg" onClick={() => { changeProfileInfo() }}>Save</Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div>
                                        <div>
                                            <Button className={styles.link} onClick={toggleDevices}> » Here you can manage your devices access</Button>
                                        </div>
                                        <Collapse isOpen={isOpenDevices}>
                                            <div className={styles.div}>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Last Ip</th>
                                                            <th>Create</th>
                                                            <th>Last Authenticated</th>
                                                            <th>Last Modified</th>
                                                            <th>Forget</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userDevices?.map((device)=> (
                                                            <tr title={"Status: " + device.status + " | Name: " + device.name + " | Key: " + device.key}>
                                                                <td>{device.lastIp}</td>
                                                                <td>{new Date(device.create * 1000).toLocaleString()}</td>
                                                                <td>{new Date(device.lastAuthenticatedDate * 1000).toLocaleString()}</td>
                                                                <td>{new Date(device.lastModifiedDate * 1000).toLocaleString()}</td>
                                                                <td><Button onClick={() => deleteDevice(device.key)}> Delete </Button></td>
                                                            </tr>
                                                        ))} 
                                                    </tbody>
                                                </table>
                                                <Button onClick={() => AuthService.logoutFromAllDevices(() => router.push("/account/signin"))}> Logout from all devices </Button>
                                                <br />
                                                <Button onClick={() => AuthService.forgetAllDevices(() => AuthService.getDevicesList(setUserDevices))}> Forget all devices </Button>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <div>
                                        <div>
                                            <Button className={styles.link} onClick={toggleDelete}> » Here you can request the deletion of the account</Button>
                                        </div>
                                        <Collapse isOpen={isOpenDelete}>
                                            <div className={styles.div}>
                                                <div className={styles.danger}>
                                                    <h1>DANGER ZONE!</h1>
                                                    <Button size="lg">Request account deletion</Button>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={styles.container}>
                                <Card>
                                    <CardBody>
                                        <CardTitle className={styles.cardtitle}>
                                            <div>
                                                <img src="/profile.png" style={{width:25, height: 25, marginRight: 5}}/>
                                            Your Profile:
                                            </div>
                                        </CardTitle>
                                        <CardText>
                                            <div className={styles.user}>
                                                <strong>Email: </strong>{userEmail}
                                            </div>
                                            <div className={styles.user}>
                                                <strong>Email verified: </strong>{(userEmailVerified)? "true" : "false"}
                                            </div>
                                            <div className={styles.user}>
                                                <strong>Name: </strong>{userName}
                                            </div>
                                            <div className={styles.user}>
                                                <strong>Surname: </strong>{userSurname}
                                            </div>
                                            <div className={styles.user}>
                                                <strong>User id: </strong>{userUsername}
                                            </div>
                                            <div className={styles.user}>
                                                <strong>Role: </strong>{userRole}
                                            </div>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </CustomerLayout>
    );
}

export default Profile;

export const getServerSideProps = async function ({ req, res }) {
    // Get the user's session based on the request
    const user = await sessionService.isAuth();
    const userProfile:User = await sessionService.getLocalStorage();
  
    if (!user && userProfile.role=='user') {
      return {
        redirect: {
          destination: '/account/signin',
          permanent: false,
        },
      }
    }
  
    return {
      props: { user },
    }
}

