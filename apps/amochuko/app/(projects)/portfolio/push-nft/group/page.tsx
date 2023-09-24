import { useState } from 'react';

const isMemberOfGroup = (signer: any, members: any[]) => {
  for (let i = 0; i < members.length; i++) {
    if (signer.address === members[i].wallet) {
      return true;
    }
    return false;
  }
};

interface GroupOptions {
  description: string;
  isPrivate?: boolean;
  profileImage?: string;
  admins?: string[];
  members?: string[];
  rules?:
    | {
        entry?:
          | {
              conditions: any[];
            }
          | undefined;
        chat?:
          | {
              conditions: any[];
            }
          | undefined;
      }
    | undefined;
}

interface CreateGroupParam {
  name: string;
  opts?: GroupOptions;
}

const CreateGroup = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [amtOfTokens, setAmtOfTokens] = useState(0);

  // create group chat
  const createGroupChat = async ({ name, opts }: CreateGroupParam) => {
    try {
      const createdGroup = await wallet?.chat.group.create(name, {
        description: opts?.description,
        private: opts?.isPrivate,
        image: opts?.profileImage,
        admins: opts?.admins,
        members: opts?.members,
        rules: opts?.rules,
      });

      // TODO: Add createGroup to `groups` state;
      // setGroup(createdGroup)
    } catch (err) {
      console.error(err);
    }
  };

  const createGroup = (e: any) => {
    // TODO: add conditions to conditions array

    try {
      //
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Form for Group condition */}
      <form onSubmit={createGroup}>
        <div>
          <label htmlFor='groupName'>Amount of Token</label>
          <input
            type='text'
            name='groupName'
            id='groupName'
            placeholder='Enter Group name'
          />
        </div>
        <div>
          <label htmlFor='groupDescription'>Amount of Token</label>
          <input
            type='text'
            name='groupDescription'
            id='groupDescription'
            placeholder='Enter Group description'
          />
        </div>
        <div>
          <label htmlFor='groupPrivate'>Amount of Token</label>
          <input
            type='radio'
            name='groupPrivate'
            id='groupPrivate'
            value={'true'}
          />
          <input
            type='radio'
            name='groupPrivate'
            id='groupPrivate'
            value={'false'}
          />
        </div>

        <div id='rules'>
          <label>Type of Rule</label>
          <select>
            <option value='entry'>Entry</option>
            <option value='chat'>Chat</option>
          </select>
        </div>
        <legend>
          <caption>Select Criteria</caption>
          <select>
            <option value='push'>PUSH</option>
            <option value='guild'>GUILD</option>
          </select>
        </legend>
        <legend>
          <caption>Select Category</caption>
          <select>
            <option value='erc20'>ERC20</option>
            <option value='erc721'>ERC721</option>
          </select>
        </legend>
        <legend>
          <caption>Select Subcategory</caption>
          <select>
            <option value='holder'>Holder</option>
            <option value='owner'>Owner</option>
          </select>
        </legend>

        <div>
          <label htmlFor='contractAddress'>Contract Address</label>
          <input
            type='text'
            name='contractAddress'
            id='contractAddress'
            value={contractAddress}
            placeholder='Enter contract address of the token'
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </div>

        <legend>
          <caption>Comparison operator</caption>
          <select>
            <option value='>='>Greater Than or Equals</option>
          </select>
        </legend>

        <div>
          <label htmlFor='AmtOfToken'>Amount of Token</label>
          <input
            type='number'
            name='amtOfTokens'
            id='amtOfTokens'
            value={amtOfTokens}
            placeholder='Enter amount of token'
            onChange={(e) => setAmtOfTokens(+e.target.value)}
          />
        </div>

        <button type='submit'>Creat Group</button>
      </form>
    </>
  );
};
